// Per-user socket registry.
//
// Policy: "one active socket per user". When a new socket authenticates for a
// userId that already has a live socket, we force-disconnect the old one.
// Redis is used if configured; otherwise an in-memory Map handles local dev.

import { logger } from '../utils/logger';
import Redis from 'ioredis';
import * as gameService from './game.service';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
const memorySessions = new Map<string, string>(); // userId -> socketId

const takeoverSockets = new Set<string>();

export interface TakeoverNotice {
  previousSocketId: string;
}

export async function checkActiveGameConflict(_userId: string): Promise<boolean> {
  // Allow players to reconnect or join from any tab/device without false lockout
  return false;
}

export async function register(userId: string, socketId: string): Promise<TakeoverNotice | null> {
  if (redis) {
    const existingSocketId = await redis.get(`session:${userId}`);
    await redis.set(`session:${userId}`, socketId, 'EX', 86400); // 24hr TTL

    if (existingSocketId && existingSocketId !== socketId) {
      takeoverSockets.add(existingSocketId);
      logger.info(`session takeover: user=${userId} oldSocket=${existingSocketId} newSocket=${socketId}`);
      return { previousSocketId: existingSocketId };
    }
    return null;
  }

  // In-memory fallback for local development
  const existingSocketId = memorySessions.get(userId);
  memorySessions.set(userId, socketId);

  if (existingSocketId && existingSocketId !== socketId) {
    takeoverSockets.add(existingSocketId);
    logger.info(`session takeover (memory): user=${userId} oldSocket=${existingSocketId} newSocket=${socketId}`);
    return { previousSocketId: existingSocketId };
  }
  return null;
}

export async function unregister(userId: string, socketId: string): Promise<void> {
  if (redis) {
    const existingSocketId = await redis.get(`session:${userId}`);
    if (existingSocketId === socketId) {
      await redis.del(`session:${userId}`);
    }
  } else {
    if (memorySessions.get(userId) === socketId) {
      memorySessions.delete(userId);
    }
  }
  takeoverSockets.delete(socketId);
}

export function isTakeoverSocket(socketId: string): boolean {
  return takeoverSockets.has(socketId);
}

export function consumeTakeoverFlag(socketId: string): boolean {
  const was = takeoverSockets.has(socketId);
  takeoverSockets.delete(socketId);
  return was;
}

export async function activeSocketFor(userId: string): Promise<string | undefined> {
  if (redis) {
    const val = await redis.get(`session:${userId}`);
    return val || undefined;
  }
  return memorySessions.get(userId);
}
