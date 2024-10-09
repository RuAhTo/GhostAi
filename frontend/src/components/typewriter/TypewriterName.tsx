import React from 'react';
import TypewriterComponent from './TypewriterComponent';

const TypewriterName: React.FC = () => {
  return (
    <TypewriterComponent
      strings={['Fyll i namnet på din karaktär.']}
      delay={130}
      loop={false}
      cursor={'|'}
    />
  );
}

export default TypewriterName;
