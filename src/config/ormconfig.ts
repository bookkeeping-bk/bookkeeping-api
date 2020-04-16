import * as path from 'path';

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
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
  },
};
