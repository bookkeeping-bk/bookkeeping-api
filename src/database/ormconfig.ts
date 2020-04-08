import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/database.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'database', 'entitys', '*')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*')],
  cli: {
    entitiesDir: 'src/database/entitys',
    migrationsDir: 'src/database/migrations'
  }
};

module.exports = options;
