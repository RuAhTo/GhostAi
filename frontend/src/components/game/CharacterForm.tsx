import React from 'react';
import { useFadeAnimation } from '../animation/FadeAnimation';

interface CharacterFormProps {
  characterName: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ characterName, handleChange, handleSubmit }) => {
    const { fadeClass, triggerFade } = useFadeAnimation();
  
    const handleFormSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      await triggerFade('fade-out'); 
      handleSubmit(event); 
    };
  
    return (
      <form onSubmit={handleFormSubmit} className={`form-container ${fadeClass}`}>
        <input
          className="main-btn"
          type="text"
          value={characterName}
          onChange={handleChange}
          placeholder="Ditt karaktärs namn"
          required
        />
        <button type="submit" className="main-btn">Skicka</button>
      </form>
    );
  };
  

export default CharacterForm;
