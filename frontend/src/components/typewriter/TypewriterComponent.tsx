import React, { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect';

interface TypewriterProps {
  strings: string[];
  loop?: boolean;
  delay?: number;
  cursor?: string;
  pauseFor?: number;
  deleteSpeed?: any | null;
}

const TypewriterComponent: React.FC<TypewriterProps> = ({
  strings,
  loop = false,
  delay = 80,
  cursor = '|',
  deleteSpeed = 'natural',
}) => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (textContainerRef.current) {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <div
      ref={textContainerRef}
      id="typewriter"
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(strings.join(' '))
            .callFunction(() => {
              scrollToBottom();
            })
            .start();
        }}
        options={{
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
