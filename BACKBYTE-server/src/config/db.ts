import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';

let memoryServer: any = null;

const MONGOOSE_OPTIONS: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 4_000,
  connectTimeoutMS: 4_000,
  socketTimeoutMS: 60_000,
  maxPoolSize: 10,
  retryWrites: true,
};

export async function connectDB(): Promise<void> {
  mongoose.connection.on('error', (err: Error) => {
    logger.error('MongoDB runtime error', { error: err.message });
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected — Mongoose will attempt auto-reconnect');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
  });

  try {
    logger.info(`Attempting MongoDB connection to ${env.MONGODB_URI}...`);
    await mongoose.connect(env.MONGODB_URI, MONGOOSE_OPTIONS);
    logger.info('MongoDB connected successfully');
  } catch (err) {
    if (env.NODE_ENV !== 'production') {
      logger.warn(`Could not connect to ${env.MONGODB_URI}. Starting local MongoMemoryServer fallback...`);
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const memoryUri = memoryServer.getUri();
        await mongoose.connect(memoryUri);
        logger.info(`Connected to in-memory MongoDB at ${memoryUri}`);
        return;
      } catch (memErr) {
        logger.error('Failed to start MongoMemoryServer', { error: (memErr as Error).message });
      }
    }
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.connection.close();
  if (memoryServer) {
    await memoryServer.stop();
  }
  logger.info('MongoDB connection closed gracefully');
}
