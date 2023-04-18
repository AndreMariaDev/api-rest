//import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { appConfig } from './app.config';
import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import * as path from 'path'


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: appConfig.host,
    port: Number.parseInt(appConfig.port || "5432"),
    username: appConfig.username,
    password: appConfig.password,
    database: appConfig.database,
    entities: [Role,User],
    synchronize: false,
    migrations: ['dist/migrations/*{.ts,.js}'],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true
}

export const dataSourceOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: appConfig.host,
    port: Number.parseInt(appConfig.port || "5432"),
    username: appConfig.username,
    password: appConfig.password,
    database: appConfig.database,
    entities: [Role,User],
    synchronize: false,
    migrations: [path.join(process.cwd(), `/src/migrations/*{.ts,.js}`)], // path.resolve(process.cwd(), `dist` ),
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
}

export default new DataSource(dataSourceOptions);