'use client';

import useBlobity from 'blobity/lib/react/useBlobity';
import { useEffect } from 'react';

const initialBlobityOptions = {
  licenseKey: 'opensource',
  focusableElementsOffsetX: 4,
  focusableElementsOffsetY: 4,
  color: '#3b82f6',
  dotColor: '#3b82f6',
  invert: false,
  focusableElements:
    '[data-blobity], [data-blobity-tooltip]',
  font: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  fontSize: 16,
  fontWeight: 800,
  opacity: 0.3,
  fontColor: '#ffffff',
  zIndex: 1,
  size: 20,
  radius: 4,
  magnetic: true,
};

export const useBlobEffect = () => {
  const blobityInstance = useBlobity(initialBlobityOptions);

  useEffect(() => {
    if (blobityInstance.current) {
      // @ts-expect-error for debugging purposes or playing around
      window.blobity = blobityInstance.current;
    }
  }, [blobityInstance]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, []);

  return blobityInstance;
};
