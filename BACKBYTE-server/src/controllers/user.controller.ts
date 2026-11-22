import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { User } from '../models/User.model';
import { GameHistory } from '../models/GameHistory.model';

export async function getMe(req: AuthRequest, res: Response): Promise<void> {
  res.json(req.userDoc);
}

export async function updateMe(req: AuthRequest, res: Response): Promise<void> {
  const { skillLevel, preferredLanguages } = req.body;
  const update: Record<string, unknown> = {};

  if (skillLevel) update.skillLevel = skillLevel;
  if (preferredLanguages) update.preferredLanguages = preferredLanguages;

  const user = await User.findByIdAndUpdate(req.userDoc?._id, { $set: update }, { new: true });
  res.json(user);
}

export async function getProfile(req: AuthRequest, res: Response): Promise<void> {
  const rawId = req.params.userId;
  const userIdParam = Array.isArray(rawId) ? rawId[0] : rawId;
  const query = userIdParam.match(/^[0-9a-fA-F]{24}$/)
    ? { $or: [{ _id: userIdParam }, { googleId: userIdParam }] }
    : { googleId: userIdParam };

  const user = await User.findOne(query).select('displayName avatarUrl stats skillLevel');
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
}

export async function getHistory(req: AuthRequest, res: Response): Promise<void> {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;

  const history = await GameHistory.find({ 'players.userId': req.userId })
    .sort({ playedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json(history);
}
