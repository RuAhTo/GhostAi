import React, { useState } from 'react';
import TypewriterComponent from '../components/typewriter/TypewriterComponent';
import '../SCSS/index.scss';

const Game: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [characterName, setCharacterName] = useState('');

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCharacterName(event.target.value); 
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Karaktärens namn:', characterName);
  };

  return (
    <main>
      <div className="tv-container">
        <div className="story-container">
          {isStarted ? (
            <>
              <TypewriterComponent strings={['Ange din karaktärs namn.']} />
            </>
          ) : (
            <TypewriterComponent strings={['Välkommen till GhostAi...', 'Klicka för att börja.']} />
          )}
        </div>
        <div className="choice-container">
          {isStarted ? (
            <>
            <form onSubmit={handleSubmit} >
              <input
                className='start-btn'
                type="text"
                value={characterName}
                onChange={handleChange}
                placeholder="Ditt karaktärs namn"
                required
              />
              <button type="submit" className='start-btn'>Skicka</button>
            </form>
          </>
          ) : (
            <div className='start-btn-container'>
            <button className='start-btn' onClick={handleStart}>Börja</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Game;
