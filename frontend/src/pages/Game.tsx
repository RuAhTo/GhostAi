import React, { useState } from 'react';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import '../SCSS/index.scss';
import CharacterForm from '../components/game/CharacterForm';
import { useFadeAnimation } from '../components/animation/FadeAnimation';

interface StoryResponse {
  scenario: string;
  options?: string[];
}

const Game: React.FC = () => {
  const [gameStage, setGameStage] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [storyAi, setStoryAi] = useState('');
  const [playerOptions, setPlayerOptions] = useState<string[]>([]);
  const [typewriterCompleted, setTypewriterCompleted] = useState(false);
  const [intensity, setIntensity] = useState(6);
  const { fadeClass, triggerFade } = useFadeAnimation();
  
  const fetchStory = async (url: string, body?: any) => {
    try {
      const response = body
        ? await axios.post<StoryResponse>(url, body)
        : await axios.get<StoryResponse>(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching story:', error);
      return null;
    }
  };

  const advanceGameStage = async (newStage: number, fadeType: string) => {
    await triggerFade(fadeType);
    setGameStage(newStage);
    await triggerFade('fade-in');
  };

  const handleStart = () => advanceGameStage(1, 'fade-out');

  const handleStoryStart = async (event: React.FormEvent) => {
    event.preventDefault();
    setTypewriterCompleted(false); // Reset completion state
    await triggerFade('fade-out');
    const data = await fetchStory('http://localhost:5000/api/story/start');

    if (data) {
      setStoryAi(data.scenario);
      setPlayerOptions(data.options || []); // Ensure options are an empty array if not present
      setGameStage(3);
    }
    await triggerFade('fade-in');
  };

  const handlePlayerChoice = async (choice: string) => {
    setTypewriterCompleted(false);
    await triggerFade('fade-out');
    const data = await fetchStory('http://localhost:5000/api/story/choice', {
      currentStory: storyAi,
      playerChoice: choice,
      intensity,
    });

    if (data) {
      setStoryAi(data.scenario);
      setIntensity((prevIntensity) => Math.min(prevIntensity + 1, 6)); // Cap intensity at 6
      console.log(intensity)
      
      // If intensity reaches 6, it's the final stage
      if (intensity >= 6) {
        setPlayerOptions([]); // No more options at the end
        setGameStage(4); // Move to the ending frame
      } else {
        setPlayerOptions(data.options || []);
      }
    }

    await triggerFade('fade-in');
  };

  const renderButtons = () => {
    switch (gameStage) {
      case 0:
        return <button className={`main-btn ${fadeClass}`} onClick={handleStart}>Börja</button>;
      case 1:
        return (
          <CharacterForm 
            characterName={characterName} 
            handleChange={(e) => setCharacterName(e.target.value)} 
            handleSubmit={() => advanceGameStage(2, 'fade-out')} 
          />
        );
      case 2:
        return <button className={`main-btn ${fadeClass}`} onClick={handleStoryStart}>Ny berättelse</button>;
      case 3:
        return (
          typewriterCompleted && ( // Only render buttons after typewriter is done
            <div className={`options-container ${fadeClass}`}>
              {playerOptions.map((option, index) => (
                <button key={index} className="main-btn" onClick={() => handlePlayerChoice(option)}>
                  {option}
                </button>
              ))}
            </div>
          )
        );
        case 4: // Ending frame
        return (
          typewriterCompleted && (
            <div className={`ending-frame ${fadeClass}`}>
              <button className="main-btn" onClick={() => window.location.reload()}>Spela igen</button>
            </div>
          )
        );
      default:
        return null;
    }
  };

  const renderTypewriter = () => {
    const options = { autoStart: true };
  
    switch (gameStage) {
      case 0:
        return (
          <Typewriter
            options={{ ...options, strings: ['Välkommen till GhostAi.', 'Klicka för att börja.'], loop: true }}
          />
        );
      case 1:
        return <Typewriter options={{ ...options, strings: 'Ange din karaktärs namn.' }} />;
      case 2:
        return <Typewriter options={{ ...options, strings: `Välkommen ${characterName}, låt oss börja...` }} />;
      case 3:
        return (
          <Typewriter
            key={storyAi}
            options={options}
            onInit={(typewriter) => {
              typewriter
                .typeString(storyAi)
                .callFunction(() => setTypewriterCompleted(true)) // Set completed when finished
                .start();
            }}
          />
        );
      case 4:
        return (
          <div className={`ending-frame ${fadeClass}`}>
            <Typewriter
              key={storyAi}
              options={options}
              onInit={(typewriter) => {
                typewriter
                  .typeString(storyAi)
                  .callFunction(() => setTypewriterCompleted(true))
                  .start();
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };
  

  return (
    <main>
      <div className="game-container">
        <div className={`story-container ${fadeClass}`}>
          {renderTypewriter()}
        </div>
        <div className="button-container">
          {renderButtons()}
        </div>
      </div>
    </main>
  );
};

export default Game;
