'use client';

import { useEffect } from 'react';

function ScreenAdapter() {
  const handleRootFontSize = (): void => {
    let clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth;

    if (clientWidth >= 640) clientWidth = 640;

    const fontSize = (20 / 375) * clientWidth;
    document.documentElement.style.fontSize = fontSize + 'px';
  };

  useEffect(() => {
    handleRootFontSize();

    window.addEventListener('resize', handleRootFontSize);

    return () => window.removeEventListener('resize', handleRootFontSize);
  }, []);

  return null;
}

export default ScreenAdapter;
