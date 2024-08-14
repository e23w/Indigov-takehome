import dotenv from 'dotenv';
dotenv.config();

import  {Pool, PoolConfig} from 'pg';

const options: PoolConfig = {
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 100
}

export const client = new Pool(options);