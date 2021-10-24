import dotenv from 'dotenv'

const env = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
if (env.error) {
    throw new Error(env.error.message);
}

export interface AuthConfig {
    jwtSecret: string
}

export const authConfig: AuthConfig = {
    jwtSecret: process.env.JWT_SECRET
};
