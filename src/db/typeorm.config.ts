import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
    type: "postgres",
    host: this.configService.get<string>('DATABASE_HOST'),
    port: 5432,
    username: "postgres",
    password: this.configService.get<string>('DATABASE_PW'),
    database: "fets",
    entities: [User],
    synchronize: true,  
    ssl: {
      rejectUnauthorized: false,
    },
    logging: true,
    } as TypeOrmModuleOptions
  } 
}
