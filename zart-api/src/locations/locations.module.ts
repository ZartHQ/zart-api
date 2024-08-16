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
export class LocationsModule implements OnModuleInit {
  constructor(private readonly locationsService: LocationsService) {}
  async onModuleInit() {
    const initialLocations = [
      { area: 'surulere', active: true },
      { area: 'ikeja', active: true },
    ];
    for (const location of initialLocations) {
      await this.locationsService.create(location);
    }
  }
}
