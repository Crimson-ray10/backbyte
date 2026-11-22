'use client';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Timer } from '@/components/ui/Timer';
import { GameState } from '@/types/game';
import { useBgm } from '@/hooks/useBgm';

interface Props {
  game: GameState;
  myRole: string | null;
}

export function SharedProgress({ game, myRole }: Props) {
  const completedTasks = game.tasks.filter((t) => t.isCompleted).length;
  const { isMuted, toggleMute } = useBgm();

  return (
    <div className="flex items-center gap-4 px-4 py-2 game-panel">
      {/* Timer */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>Time</span>
        <Timer remainingMs={game.timer.remainingMs} />
      </div>

      <div className="w-px h-6" style={{ background: 'var(--border)' }} />

      {/* Progress */}
      <div className="flex-1 flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
          Progress
        </span>
        <ProgressBar
          value={game.sharedProgress}
          color={game.sharedProgress >= 80 ? '#22c55e' : '#4f8ef7'}
          height={10}
          showLabel
        />
      </div>

      <div className="w-px h-6" style={{ background: 'var(--border)' }} />

      {/* Tasks */}
      <div className="text-right">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Tasks</p>
        <p className="text-sm font-bold">
          {completedTasks}/{game.tasks.length}
        </p>
      </div>

      {/* Role badge */}
      <div className="w-px h-6" style={{ background: 'var(--border)' }} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5"
        style={{
          background: myRole === 'imposter' ? 'rgba(220, 38, 38, 0.12)' : 'rgba(22, 163, 74, 0.12)',
          color: myRole === 'imposter' ? '#b91c1c' : '#15803d',
          border: `1px solid ${myRole === 'imposter' ? 'rgba(220, 38, 38, 0.25)' : 'rgba(22, 163, 74, 0.25)'}`,
          boxShadow: 'none',
          textShadow: 'none',
        }}
      >
        <span suppressHydrationWarning>{myRole === 'imposter' ? '😈' : '👨‍💻'}</span>
        <span suppressHydrationWarning>{myRole === 'imposter' ? 'IMPOSTER' : 'CODER'}</span>
      </motion.div>

      {/* Audio BGM toggle button */}
      <div className="w-px h-6" style={{ background: 'var(--border)' }} />
      <button
        onClick={toggleMute}
        title={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
        className="px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 transition-all"
        style={{
          background: isMuted ? 'rgba(28, 25, 23, 0.05)' : 'rgba(37, 99, 235, 0.12)',
          color: isMuted ? 'var(--text-muted)' : '#1d4ed8',
          border: `1px solid ${isMuted ? 'rgba(28, 25, 23, 0.15)' : 'rgba(37, 99, 235, 0.25)'}`,
          cursor: 'pointer',
          boxShadow: 'none',
        }}
      >
        <span suppressHydrationWarning>{isMuted ? '🔇' : '🎵'}</span>
        <span suppressHydrationWarning className="hidden sm:inline">{isMuted ? 'MUTE' : 'BGM'}</span>
      </button>
    </div>
  );
}
