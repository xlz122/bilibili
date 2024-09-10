'use client';

import { useLayoutEffect, useEffect } from 'react';

function Resize() {
  const handleRootFontSize = (): void => {
    let clientWidth =
      document.documentElement.clientWidth ?? document.body.clientWidth;

    if (clientWidth >= 640) clientWidth = 640;

    const fontSize = (20 / 375) * clientWidth;
    document.documentElement.style.fontSize = fontSize + 'px';
  };

  useLayoutEffect(() => {
    handleRootFontSize();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleRootFontSize);

    return () => window.removeEventListener('resize', handleRootFontSize);
  }, []);

  return null;
}

export default Resize;
