'use client';
import { useState, useEffect } from 'react';
import { bgm } from '@/lib/bgm';
import { AppSocket } from '@/lib/socket';

export function useBgm(phase?: string, socket?: AppSocket | null, isMeetingActive?: boolean) {
  // Start with false so server rendering and initial client hydration match perfectly
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(bgm.getMuted());
    return bgm.subscribe((muted) => setIsMuted(muted));
  }, []);

  // Sync with game phase
  useEffect(() => {
    if (!phase) return;

    if (phase === 'playing') {
      bgm.resume('game-over');
      bgm.play();
    } else if (phase === 'results') {
      bgm.pause('game-over');
    }
  }, [phase]);

  // Sync with emergency meeting
  useEffect(() => {
    if (isMeetingActive) {
      bgm.pause('meeting');
    } else {
      bgm.resume('meeting');
    }
  }, [isMeetingActive]);

  // Sync with sabotages
  useEffect(() => {
    if (!socket) return;

    const onBlurred = ({ durationMs }: { durationMs: number }) => {
      // Auto dramatic audio cut/pause on sabotage
      bgm.pause('sabotage', durationMs || 2500);
    };

    socket.on('imposter:screen-blurred', onBlurred);

    return () => {
      socket.off('imposter:screen-blurred', onBlurred);
    };
  }, [socket]);

  return {
    isMuted,
    toggleMute: () => bgm.toggleMute(),
  };
}
