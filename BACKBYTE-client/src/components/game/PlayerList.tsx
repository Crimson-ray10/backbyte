import { motion } from 'framer-motion';
import { MainTestCaseState, PlayerState } from '@/types/game';
import { Avatar } from '@/components/ui/Avatar';

interface Props {
  players: PlayerState[];
  myUserId: string;
  testCases?: MainTestCaseState[];
}

export function PlayerList({ players, myUserId, testCases = [] }: Props) {
  const passedCount = testCases.filter(tc => tc.passed).length;
  const total = testCases.length;
  const progressPct = total > 0 ? (passedCount / total) * 100 : 0;
  const allPassed = total > 0 && passedCount === total;

  return (
    <div className="game-panel h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-bold text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Players ({players.filter((p) => p.isConnected).length})
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {players.map((player) => (
          <div
            key={player.userId}
            className="flex items-center gap-2 p-2 rounded-lg transition-colors"
            style={{
              background: player.userId === myUserId ? 'rgba(28, 25, 23, 0.08)' : 'transparent',
              border: player.userId === myUserId ? '1px solid rgba(28, 25, 23, 0.15)' : '1px solid transparent',
              opacity: player.isAlive && player.isConnected ? 1 : 0.4,
              boxShadow: 'none',
            }}
          >
            <Avatar src={player.avatarUrl} name={player.displayName} color={player.color} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {player.displayName}
                {player.userId === myUserId && (
                  <span className="ml-1 text-xs" style={{ color: 'var(--text-muted)' }}>(you)</span>
                )}
              </p>
              {!player.isAlive && (
                <p className="text-xs" style={{ color: '#b91c1c' }}>Ejected</p>
              )}
            </div>
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: player.isConnected && player.isAlive ? '#16a34a' : '#78716c',
                boxShadow: 'none',
              }}
            />
          </div>
        ))}

        {total > 0 && (
          <div className="mt-3 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
            {/* Header + counter */}
            <div className="flex items-center justify-between px-2 mb-2">
              <p className="font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)', fontSize: '9px' }}>
                Main Code Tests
              </p>
              <span
                className="font-mono font-bold"
                style={{ fontSize: '10px', color: allPassed ? '#16a34a' : 'var(--text-muted)' }}
              >
                {passedCount}/{total}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mx-2 mb-2 rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(28, 25, 23, 0.12)' }}>
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: allPassed ? '#16a34a' : 'linear-gradient(90deg, #2563eb, #16a34a)',
                  borderRadius: 9999,
                }}
              />
            </div>

            {/* Test case list */}
            {testCases.map((tc) => (
              <motion.div
                key={tc.id}
                layout
                className="flex items-start gap-2 px-2 py-1 rounded transition-colors"
                style={{
                  background: tc.passed ? 'rgba(22, 163, 74, 0.08)' : 'transparent',
                  border: tc.passed ? '1px solid rgba(22, 163, 74, 0.2)' : '1px solid transparent',
                  boxShadow: 'none',
                }}
              >
                <span
                  className="flex-shrink-0 font-bold mt-0.5"
                  style={{ fontSize: '11px', color: tc.passed ? '#15803d' : '#78716c', minWidth: 12 }}
                >
                  {tc.passed ? '✓' : '○'}
                </span>
                <span
                  className="leading-snug"
                  style={{
                    fontSize: '10px',
                    color: tc.passed ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: tc.passed ? 500 : 400,
                  }}
                >
                  {tc.description}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
