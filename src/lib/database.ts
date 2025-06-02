import { DataSource } from 'typeorm';
import { logger } from '@/logger';
import { Category } from '../entities/Category';
import { Post } from '../entities/Post';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'nextauth',
    entities: [Category, Post],
    synchronize: process.env.NODE_ENV !== 'production', // Don't set to true in production
    logging: process.env.NODE_ENV !== 'production',
  });
  
  let initialized = false;
  
  export const initializeDatabase = async () => {
    if (!initialized) {
      try {
        await AppDataSource.initialize();
        initialized = true;
        logger.info('Database connection established');
      } catch (err: unknown) {
        const error = err as Error;
        logger.error(error);
        throw error;
      }
    }
    return AppDataSource;
  };
