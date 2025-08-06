'use client';

import { useBlobEffect } from '@/hooks/useBlobEffect';

export const BlobEffectProvider = ({ children }: { children: React.ReactNode }) => {
  useBlobEffect();
  
  return <>{children}</>;
};