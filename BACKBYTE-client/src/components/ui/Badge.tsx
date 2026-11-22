import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'red' | 'green' | 'yellow' | 'gray';
  className?: string;
}

export function Badge({ children, variant = 'blue', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border transition-colors',
        {
          'bg-blue-500/10 text-blue-700 border-blue-500/20': variant === 'blue',
          'bg-rose-500/10 text-rose-700 border-rose-500/20': variant === 'red',
          'bg-emerald-500/10 text-emerald-800 border-emerald-500/20': variant === 'green',
          'bg-amber-500/10 text-amber-800 border-amber-500/20': variant === 'yellow',
          'bg-stone-500/10 text-stone-700 border-stone-500/20': variant === 'gray',
        },
        className
      )}
      style={{
        boxShadow: 'none',
        textShadow: 'none',
      }}
    >
      {children}
    </span>
  );
}
