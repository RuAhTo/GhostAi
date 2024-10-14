import React from 'react';
import TypewriterComponent from './TypewriterComponent';

const TypewriterStart: React.FC = () => {
  return (
    <TypewriterComponent
      strings={['Välkommen till GhostAi...', 'Klicka för att börja.',]}
      delay={130}
      cursor={'|'}
    />
  );
}

export default TypewriterStart;
