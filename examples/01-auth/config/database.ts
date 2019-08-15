import * as dotenv from 'dotenv';
import * as path from 'path';

import { envBoolean } from 'nestin-common/help/env-unit';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '../.env.test') });
} else {
  dotenv.config();
}

export const type = process.env.DB_NAME || 'sqlite';
export const database = process.env.DB_NAME || './database/db.sqlite';
export const host = process.env.DB_HOST || '127.0.0.1';
export const port = process.env.DB_PORT || 5432;
export const username = process.env.DB_USERNAME || 'root';
export const password = process.env.DB_PASSWORD || '123456';
export const entities = [
  path.resolve(__dirname, '../app/**/*.entity{.ts,.js}'),
  path.resolve(__dirname, '../extends/**/*.entity{.ts,.js}'),
];
export const cli = {
  migrationsDir: 'database/migration',
};
export const migrations = process.env.RUN_MODE === 'typeorm' && [path.resolve('database', 'migration/*.ts')];
export const logging = false;
export const synchronize = envBoolean('DB_SYNC', false);
export const cache = true;

export default {
  type,
  database,
  host,
  port,
  username,
  password,
  entities,
  migrations,
  cli,
  logging,
  synchronize,
  cache,
};
