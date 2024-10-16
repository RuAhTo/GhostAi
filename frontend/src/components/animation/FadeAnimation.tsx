import { useState } from 'react';

// Helper hook for animations
export const useFadeAnimation = (initialState: 'fade-in' | 'fade-out' = 'fade-in', duration: number = 1000) => {
  const [fadeClass, setFadeClass] = useState(initialState);

  const triggerFade = (fadeType: 'fade-in' | 'fade-out') => {
    return new Promise<void>((resolve) => {
      setFadeClass(fadeType);
      setTimeout(() => resolve(), duration);
    });
  };

  return { fadeClass, triggerFade };
};