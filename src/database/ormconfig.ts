import * as path from 'path';

module.exports = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [path.resolve(__dirname, '..', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: 'src/database/entitys',
    migrationsDir: 'src/database/migrations',
  },
};
