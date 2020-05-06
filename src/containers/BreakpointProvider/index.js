import React, { createContext, useState, useEffect, useContext } from 'react';

const defaultValue = {};
const BreakpointContext = createContext(defaultValue);
const { Provider } = BreakpointContext;

const BreakpointProvider = ({ children, queries }) => {
  const [queryMatch, setQueryMatch] = useState({
    matches: {},
    currMatch: '',
  });

  useEffect(() => {
    // Store returned MediaQueryList from matchMedia in object
    const mediaQueryLists = {};
    const keys = Object.keys(queries);
    // Check if event listener is attached
    let isAttached = false;

    // Update state on each breakpoint change
    // Happens whenever there's a match with any of our media queries in the passed in mediaQueries object
    const handleQueryListener = () => {
      const updatedMatches = keys.reduce((acc, media) => {
        acc[media] = !!(
          mediaQueryLists[media] && mediaQueryLists[media].matches
        );
        return acc;
      }, {});
      const updatedCurrentMatch = Object.keys(updatedMatches).filter(
        (el) => updatedMatches[el] === true,
      );
      setQueryMatch({
        ...queryMatch,
        matches: updatedMatches,
        currMatch: updatedCurrentMatch[0],
      });
    };

    if (window && window.matchMedia) {
      // Store initial matches returned by matchMedia for each media query in object
      const matches = {};
      // let matches = {};
      // Loop through each passed in media query
      keys.forEach((media) => {
        // Make sure key exists
        if (typeof queries[media] === 'string') {
          // Store returned value of each matchMedia in corresponding key
          mediaQueryLists[media] = window.matchMedia(queries[media]);
          // Fill matches object with matches property returned from matchMedia
          matches[media] = mediaQueryLists[media].matches;
        } else {
          matches[media] = false;
        }
      });
      // Return also the key of the matching media query
      const currentMatch = Object.keys(matches).filter(
        (el) => matches[el] === true,
      );
      // Update state to initial matches (1st load)
      setQueryMatch({
        ...queryMatch,
        matches: matches,
        currMatch: currentMatch[0],
      });
      isAttached = true;
      // Add a media query event listener to each media query
      keys.forEach((media) => {
        if (typeof queries[media] === 'string') {
          mediaQueryLists[media].addListener(handleQueryListener);
        }
      });
    }

    // Remove event listener for each media query when unmounting
    return () => {
      if (isAttached) {
        keys.forEach((media) => {
          if (typeof queries[media] === 'string') {
            mediaQueryLists[media].removeListener(handleQueryListener);
          }
        });
      }
    };
  }, [queries]);

  return <Provider value={queryMatch}>{children}</Provider>;
};

const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (context === defaultValue) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
};

export { useBreakpoint, BreakpointProvider };
