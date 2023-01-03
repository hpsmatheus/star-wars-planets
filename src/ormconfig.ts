import { DataSourceOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: './database.db',
  entities: ['dist/**/*.schema{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: 'all',
  logger: 'simple-console',
};

export = ormconfig;
