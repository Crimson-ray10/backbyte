'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { bgm } from '@/lib/bgm';

export function GlobalBgmPlayer() {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMuted(bgm.getMuted());
    bgm.play();
    return bgm.subscribe((m) => setIsMuted(m));
  }, []);

  // On the active game screen (/game/[roomId]), the HUD in SharedProgress already hosts the BGM capsule
  const isGamePage = pathname?.startsWith('/game');

  if (!mounted || isGamePage) return null;

  return (
    <aside
      aria-label="Background Music"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9990,
      }}
    >
      <button
        type="button"
        onClick={() => bgm.toggleMute()}
        title={isMuted ? 'Click to play Background Music' : 'Click to mute Background Music'}
        className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer select-none active:scale-95"
        style={{
          background: isMuted ? 'rgba(28, 25, 23, 0.88)' : 'rgba(37, 99, 235, 0.92)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.18)',
        }}
      >
        <span suppressHydrationWarning>{isMuted ? '🔇' : '🎵'}</span>
        <span suppressHydrationWarning>{isMuted ? 'BGM: OFF' : 'BGM: ON'}</span>
      </button>
    </aside>
  );
}
