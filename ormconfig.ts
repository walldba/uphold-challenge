import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'uphold-challenge',
  synchronize: true,
  entities: ['src/**/entities/*.entity{.ts,.js}'],
  migrations: ['migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
};
export = config;
