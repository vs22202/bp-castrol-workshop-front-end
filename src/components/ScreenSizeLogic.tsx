/*
This custom hook, useScreenSize, provides functionality to track the current screen size
and returns a string representing the size category ('small', 'medium', or 'large').
It utilizes the useState and useEffect hooks from React to manage the screen size state
and handle resize events, respectively.
*/

import { useState, useEffect } from 'react';

/*
 * Custom hook to track the current screen size.
 * @returns A string representing the screen size category ('small', 'medium', or 'large').
*/

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  /*
   * Function to determine the screen size based on window width.
   * @returns A string representing the screen size category.
  */
  
  function getScreenSize() {
    if (window.innerWidth < 768) {
      return 'small';
    } else if (window.innerWidth < 1000) {
      return 'medium';
    } else {
      return 'large';
    }
  }

  /*
   * Function to handle resize events and update the screen size state.
  */

  function handleResize() {
    setScreenSize(getScreenSize());
  }

  useEffect(() => {
    // Add event listener for resize events
    window.addEventListener('resize', handleResize);
     // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // Empty dependency array ensures effect runs only once

  return screenSize;
};
