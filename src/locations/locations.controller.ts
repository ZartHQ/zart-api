import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { createLocationsDto } from 'src/dto';
import { LocationEntity } from '../entities/locations.entity';
import { updateLocationsDto } from 'src/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  create(@Body() dto: createLocationsDto): Promise<LocationEntity> {
    return this.locationService.createlocation(dto);
  }

  @Get(':city')
  find(@Param('city') city: string) {
    return this.locationService.findByCity(city);
  }

  @Get()
  findAll(): Promise<LocationEntity[]> {
    return this.locationService.findAllLocations();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateLocationsDto
  ) {
    return this.locationService.updateLocation(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.deleteLocation(id);
  }
}
