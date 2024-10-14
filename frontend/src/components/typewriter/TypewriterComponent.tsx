import React from 'react';
import Typewriter from 'typewriter-effect';

interface TypewriterProps {
  strings: string[];
  loop?: boolean;
  delay?: number;
  cursor?: string;
  pauseFor?: number;
  deleteSpeed?: any|null;
}

const TypewriterComponent: React.FC<TypewriterProps> = ({
  strings,
  loop = false,
  delay = 130,
  cursor = '|',
  deleteSpeed = 'natural'
}) => {
  return (
    <div id='typewriter'>
      <Typewriter
        options={{
          strings: strings,
          autoStart: true,
          loop: loop,
          delay: delay,
          cursor: cursor,
          deleteSpeed: deleteSpeed,
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
