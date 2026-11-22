'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COOLDOWN_MS = 60000;

interface Props {
  onCall: () => void;
  disabled?: boolean;
}

export function EmergencyButton({ onCall, disabled }: Props) {
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Count down the local cooldown every second
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const t = setTimeout(() => setCooldownRemaining((c) => Math.max(0, c - 1000)), 1000);
    return () => clearTimeout(t);
  }, [cooldownRemaining]);

  const onCooldown = cooldownRemaining > 0;
  const isDisabled = onCooldown || !!disabled;
  const secsLeft = Math.ceil(cooldownRemaining / 1000);

  const handle = () => {
    if (isDisabled) return;
    onCall();
    setCooldownRemaining(COOLDOWN_MS);
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { opacity: 0.9 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={handle}
      disabled={isDisabled}
      className="flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs transition-all tracking-wide"
      style={{
        background: isDisabled ? 'var(--bg-hover)' : 'rgba(220, 38, 38, 0.12)',
        border: `1px solid ${isDisabled ? 'rgba(28, 25, 23, 0.15)' : 'rgba(220, 38, 38, 0.25)'}`,
        color: isDisabled ? 'var(--text-muted)' : '#b91c1c',
        boxShadow: 'none',
        textShadow: 'none',
      }}
    >
      <span className="text-sm">🚨</span>
      <span suppressHydrationWarning>{onCooldown ? `Meeting (${secsLeft}s)` : 'Emergency Meeting'}</span>
    </motion.button>
  );
}
