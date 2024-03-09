import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    if (window.innerWidth < 768) {
      return 'small';
    } else if (window.innerWidth < 1000) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  function handleResize() {
    setScreenSize(getScreenSize());
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};
