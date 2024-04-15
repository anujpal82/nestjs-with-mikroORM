import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');
const config = {
    entities: ['dist/**/*.entity.js'],
    pool: { max: 20 },
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: process.env.DBNAME || 'postgres',
    host: 'localhost',
    driver: PostgreSqlDriver,
    port: process.env.DBPORT || 5432,
    highlighter: new SqlHighlighter(),
    debug: true,
    logger: logger.log.bind(logger),
    password: process.env.DBPASSWORD || '123',
    metadataProvider: TsMorphMetadataProvider,
    extensions:[Migrator],
    migrations: {
        tableName: 'mikro_orm_migrations',
        glob: '!(*.d).{js,ts}', // name of database table with log of executed transactions
        path: './src/migrations', // path to the folder with migrations
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: true, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: true, // allow to disable table and column dropping
        emit: 'ts', // migration generation mode
    }
} as Options;

export default config;