import React, { useState } from 'react';
import axios from 'axios';
import Typewriter from 'typewriter-effect';
import '../SCSS/index.scss';

const Game: React.FC = () => {
  const [gameStage, setGameStage] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [storyAi, setStoryAi] = useState('');
  const [playerOptions, setPlayerOptions] = useState([]);
  const [isTypewriterFinished, setIsTypewriterFinished] = useState(false); // New state variable

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCharacterName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Karaktärens namn:', characterName);
    setGameStage(2);
  };

  const handleStart = () => {
    setGameStage(1);
  };

  const handleStoryStart = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:5000/api/story/start');
      console.log('Fetched story:', response.data);
      setStoryAi(response.data.scenario);
      setPlayerOptions(response.data.options);
      setGameStage(3);
      setIsTypewriterFinished(false); // Reset the typewriter finish state
    } catch (error) {
      console.error('Error fetching story:', error);
    }
  };

  const handleTypewriterFinish = () => {
    setIsTypewriterFinished(true); // Set to true when typewriter is finished
  };

  return (
    <main>
      <div className="tv-container">
        <div className="story-container">
          {gameStage === 0 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: ['Välkommen till GhostAi.', 'Klicka för att börja.'],
                loop: true,
                delay: 130,
                cursor: '|',
              }}
            />
          )}

          {gameStage === 1 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: 'Ange din karaktärs namn.',
                delay: 130,
                cursor: '|',
              }}
            />
          )}

          {gameStage === 2 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: `Välkommen ${characterName}, låt oss börja...`,
                delay: 130,
                cursor: '|',
              }}
            />
          )}

          {gameStage === 3 && (
            <Typewriter
              options={{
                autoStart: true,
                strings: `${storyAi}`,
                delay: 130,
                cursor: '|',
                onComplete: handleTypewriterFinish, // Call when typewriter is done
              }}
            />
          )}
        </div>

        <div className="choice-container">
          {gameStage === 0 && (
            <div className="start-btn-container">
              <button className="start-btn" onClick={handleStart}>
                Börja
              </button>
            </div>
          )}

          {gameStage === 1 && (
            <form onSubmit={handleSubmit}>
              <input
                className="start-btn"
                type="text"
                value={characterName}
                onChange={handleChange}
                placeholder="Ditt karaktärs namn"
                required
              />
              <button type="submit" className="start-btn">Skicka</button>
            </form>
          )}

          {gameStage === 2 && (
            <div>
              <button className='story-btn' onClick={handleStoryStart}>Ny berättelse</button>
            </div>
          )}

          {gameStage === 3 && isTypewriterFinished && (
            <div className="options-container">
              {playerOptions.map((option, index) => (
                <button key={index} className="option-btn">
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;
