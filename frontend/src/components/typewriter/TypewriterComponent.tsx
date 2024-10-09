import React from 'react';
import Typewriter from 'typewriter-effect';

interface TypewriterProps {
  strings: string[];
  loop?: boolean;
  delay?: number;
  cursor?: string;
}

const TypewriterComponent: React.FC<TypewriterProps> = ({
  strings,
  loop = false,
  delay = 130,
  cursor = '|',
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
        }}
      />
    </div>
  );
};

export default TypewriterComponent;
