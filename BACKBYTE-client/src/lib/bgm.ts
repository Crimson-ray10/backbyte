'use client';

class BgmAudioController {
  private audio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private isPlaying: boolean = false;
  private pauseTimeout: NodeJS.Timeout | null = null;
  private pauseReasons: Set<string> = new Set();
  private initialized: boolean = false;
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('backbyte_bgm_muted');
      this.isMuted = saved === 'true';

      // Auto-unlock on first user interaction
      const unlock = () => {
        this.init();
        if (!this.isMuted && this.isPlaying) {
          this.audio?.play().catch(() => {});
        }
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });

      // Auto cut/pause when switching browser tabs
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause('tab-hidden');
        } else {
          this.resume('tab-hidden');
        }
      });
    }
  }

  private init() {
    if (this.initialized || typeof window === 'undefined') return;
    try {
      this.audio = new Audio('/audio/bgm.mp3');
      this.audio.loop = true;
      this.audio.volume = 0.28;
      this.audio.preload = 'auto';
      this.initialized = true;
    } catch {
      // AudioContext / Audio not supported or blocked
    }
  }

  public play() {
    this.init();
    this.isPlaying = true;
    if (this.isMuted || this.pauseReasons.size > 0 || !this.audio) return;
    this.audio.play().catch(() => {
      // Will play on next user interaction
    });
  }

  /**
   * Cuts or pauses the BGM.
   * If autoResumeMs is specified, automatically resumes after the duration (e.g. sabotage glitch cut).
   */
  public pause(reason: string = 'manual', autoResumeMs?: number) {
    this.pauseReasons.add(reason);
    if (this.audio) {
      this.audio.pause();
    }

    if (this.pauseTimeout) {
      clearTimeout(this.pauseTimeout);
      this.pauseTimeout = null;
    }

    if (autoResumeMs && autoResumeMs > 0) {
      this.pauseTimeout = setTimeout(() => {
        this.resume(reason);
      }, autoResumeMs);
    }
  }

  /**
   * Resumes the BGM if all pause reasons have cleared.
   */
  public resume(reason?: string) {
    if (reason) {
      this.pauseReasons.delete(reason);
    } else {
      this.pauseReasons.clear();
    }

    if (this.pauseReasons.size === 0 && this.isPlaying && !this.isMuted && this.audio) {
      this.audio.play().catch(() => {});
    }
  }

  public stop() {
    this.isPlaying = false;
    this.pauseReasons.clear();
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  public toggleMute(): boolean {
    this.init();
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('backbyte_bgm_muted', String(this.isMuted));
    }

    if (this.isMuted) {
      this.audio?.pause();
    } else if (this.isPlaying && this.pauseReasons.size === 0) {
      this.audio?.play().catch(() => {});
    }

    this.listeners.forEach((cb) => cb(this.isMuted));
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(cb: (muted: boolean) => void) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }
}

export const bgm = new BgmAudioController();
