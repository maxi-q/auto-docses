import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';


export const useKeyPress = (keys: Array<string>, callback: Function, node: HTMLElement | null = null) => {
  // implement the callback ref pattern
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  // handle what happens on key press
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // check if one of the key is part of the ones we want
      if (keys.some((key) => event.key === key)) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    // target is either the provided node or the document
    // const targetNode = node ?? window;
    // attach the event listener
    window.addEventListener("keydown", e => {handleKeyPress(e)});

    // remove the event listener
    return () =>
      window.removeEventListener("keydown", e => {handleKeyPress(e)});
  }, [handleKeyPress, node]);
};