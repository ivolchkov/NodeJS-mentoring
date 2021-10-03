import { databaseConfig } from '../config/db.config';
import { Sequelize } from 'sequelize';

export const sequelizeConnection = new Sequelize(databaseConfig.db, databaseConfig.user, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: 'postgres',

    pool: {
        max: databaseConfig.pool.max,
        min: databaseConfig.pool.min,
        acquire: databaseConfig.pool.acquire,
        idle: databaseConfig.pool.idle
    }
});
