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
    host: 'localhost',
    user: 'root',
    password: '325066',
    db: 'user-service',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
