import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Typewriter from 'typewriter-effect';
import '../SCSS/index.scss';
import CharacterForm from '../components/game/CharacterForm';

interface StoryResponse {
  scenario: string;
  options: string[];
}

const Game: React.FC = () => {
  const [gameStage, setGameStage] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [storyAi, setStoryAi] = useState('');
  const [playerOptions, setPlayerOptions] = useState<string[]>([]);
  const [isTypewriterFinished, setIsTypewriterFinished] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setGameStage(2);
  };

  const handleStart = () => {
    setGameStage(1);
  };

  const fetchStory = async (url: string, body?: any) => {
    try {
      const response = body
        ? await axios.post<StoryResponse>(url, body)
        : await axios.get<StoryResponse>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching story:', error);
      return null;
    }
  };

  // Hantera fade-effekter
  const handleFade = (fadeType: 'fade-in' | 'fade-out', duration = 500) => {
    setFadeClass(fadeType);
    return new Promise(resolve => setTimeout(resolve, duration));
  };

  // Starta berättelsen
  const handleStoryStart = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFadingOut(true);

    await handleFade('fade-out');
    const data = await fetchStory('http://localhost:5000/api/story/start');
    if (data) {
      setStoryAi(data.scenario);
      setPlayerOptions(data.options);
      setGameStage(3);
      setIsTypewriterFinished(false);
      await handleFade('fade-in');
      setOptionsVisible(true);
    }
    setIsFadingOut(false);
  };

  // Spelarens val
  const handlePlayerChoice = async (choice: string) => {
    const currentStory = storyAi;
    setOptionsVisible(false);
    await handleFade('fade-out');

    const data = await fetchStory('http://localhost:5000/api/story/choice', {
      currentStory,
      playerOptions: choice,
    });

    if (data) {
      setStoryAi(data.scenario);
      setPlayerOptions(data.options);
      setIsTypewriterFinished(false);
      await handleFade('fade-in');
      setOptionsVisible(true);
    }
  };

  const handleTypewriterFinish = () => {
    setIsTypewriterFinished(true);
    handleFade('fade-out', 500).then(() => {
      setOptionsVisible(true);
      setFadeClass('fade-in');
    });
  };

  // Rendera knappar baserat på spelfasen
  const renderButtons = () => {
    switch (gameStage) {
      case 0:
        return <button className="main-btn" onClick={handleStart}>Börja</button>;
      case 1:
        return (
          <CharacterForm 
            characterName={characterName} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
          />
        );
      case 2:
        return <button className={`main-btn ${fadeClass}`} onClick={handleStoryStart}>Ny berättelse</button>;
      case 3:
        return optionsVisible && (
          <div className={`options-container ${fadeClass}`}>
            {playerOptions.map((option, index) => (
              <button key={index} className="main-btn" onClick={() => handlePlayerChoice(option)}>
                {option}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <div className="game-container">
        <div className={`story-container ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          {gameStage === 0 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: ['Välkommen till GhostAi.', 'Klicka för att börja.'],
                loop: true,
              }}
            />
          )}
  
          {gameStage === 1 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: 'Ange din karaktärs namn.',
              }}
            />
          )}
  
          {gameStage === 2 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: `Välkommen ${characterName}, låt oss börja...`,
              }}
            />
          )}
  
          {gameStage === 3 && (
            <Typewriter
              options={{
                autoStart: true,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(storyAi)
                  .callFunction(() => handleTypewriterFinish())
                  .start();
              }}
            />
          )}
        </div>
  
        <div className='button-container'>
          {renderButtons()}
        </div>
      </div>
    </main>
  );  
};

export default Game;
