import { Module, OnModuleInit } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { LocationEntity } from './locations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LocationsService],
  controllers: [LocationsController],
  imports: [TypeOrmModule.forFeature([LocationEntity])],
})
export class LocationsModule {}
