import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationDto } from './dto/locations.dto';
import { LocationEntity } from './locations.entity';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  create(@Body() dto: LocationDto): Promise<LocationEntity> {
    const location = this.locationService.create(dto);
    return location;
  }

  @Get()
  findAll(): Promise<LocationEntity[]> {
    const locations = this.locationService.findAll();
    return locations;
  }

  @Get('area')
  findByArea(@Param('area') areaParam: string): Promise<LocationEntity> {
    const area = this.locationService.findByArea(areaParam);
    return area;
  }
}
