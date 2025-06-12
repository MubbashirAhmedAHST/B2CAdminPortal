// "use client"
import { useRef, RefObject, useEffect, useLayoutEffect } from "react";

export const useIsomorphicEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// // MediaQueryList Event based useEventListener interface
// function useEventListener(eventName, handler, element, options) {
//   element.current.addEventListener(eventName, handler, options);
// }

// // Window Event based useEventListener interface
// function useEventListener(eventName, handler, element, options) {
//   if (!element) {
//     element = window;
//   }
//   element.addEventListener(eventName, handler, options);
// }

// // Element Event based useEventListener interface
// function useEventListener(eventName, handler, element, options) {
//   element.current.addEventListener(eventName, handler, options);
// }

// // Document Event based useEventListener interface
// function useEventListener(eventName, handler, element, options) {
//   element.current.addEventListener(eventName, handler, options);
// }

function useEventListener(eventName, handler, element, options) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler);

  useIsomorphicEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Define the listening target
    const targetElement = element ? element.current : window;

    if (!(targetElement && targetElement.addEventListener)) return;

    // Create event listener that calls handler function stored in ref
    const listener = (event) => savedHandler.current(event);

    targetElement.addEventListener(eventName, listener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, options);
    };
  }, [eventName, element, options]);
}

export { useEventListener };
