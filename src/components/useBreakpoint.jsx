import { useState, useEffect } from 'react';

function useBreakpoint(breakpoints) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (windowSize < breakpoints.mobile) {
    return 'mobile';
  } else if (windowSize < breakpoints.tablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

export default useBreakpoint;