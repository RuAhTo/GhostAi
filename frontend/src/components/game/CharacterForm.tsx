import React from 'react';

interface CharacterFormProps {
  characterName: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ characterName, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
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

export default CharacterForm;
