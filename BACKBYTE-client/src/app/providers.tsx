'use client';
import { SessionProvider } from 'next-auth/react';
import { CinematicProvider } from '@/components/landing/CinematicProvider';
import { GlobalBgmPlayer } from '@/components/audio/GlobalBgmPlayer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CinematicProvider>
        {children}
        <GlobalBgmPlayer />
      </CinematicProvider>
    </SessionProvider>
  );
}
