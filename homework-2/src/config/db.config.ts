import dotenv from 'dotenv'

const env = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
if (env.error) {
    throw new Error(env.error.message);
}

interface DatabasePool {
    max: number;
    min: number;
    acquire: number;
    idle: number;
}

interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    db: string;
    pool: DatabasePool;
}

export const databaseConfig: DatabaseConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    db: process.env.DB_NAME,
    pool: {
        max: Number(process.env.DB_POOL_MAX),
        min: Number(process.env.DB_POOL_MIN),
        acquire: Number(process.env.DB_POOL_ACQUIRE),
        idle: Number(process.env.DB_POOL_IDLE)
    }
};
