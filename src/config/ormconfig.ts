import * as path from 'path';

// const envConfig = require('dotenv').config(
//   `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
// );

// function env(key) {
//   return envConfig[key] || process.env[key];
// }

module.exports = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  entities: [path.resolve(__dirname, '..', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*')],
  seeds: [path.resolve(__dirname, '..', 'database', 'seeds', '*')],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
  },
};
