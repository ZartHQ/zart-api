import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
// import { UsersModule } from './users/users.module';
import { LocationsModule } from './locations/locations.module';
import { CategoryModule } from './category/category.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("POSTGRES_HOST"),
        port: config.get("POSTGRES_PORT", 5432),
        username: config.get("POSTGRES_USER"),
        password: config.get("POSTGRES_PASSWORD"),
        database: config.get("POSTGRES_DB"),
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: true,
        logging: ['query', 'error', 'schema'],
      }),
    }),
    AuthModule,
    LocationsModule,
    CategoryModule,
    RequestModule,
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
