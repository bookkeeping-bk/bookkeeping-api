module.exports = {
  type: process.env.DB_TYPE,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [__dirname + '/entitys/*{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/database/entitys',
    migrationsDir: 'src/database/migrations',
  },
};
