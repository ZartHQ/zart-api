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

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  create(@Body() dto: createLocationsDto): Promise<LocationEntity> {
    return this.locationService.create(dto);
  }

  @Get(':city')
  find(@Param('city') city: string) {
    return this.locationService.findByCity(city);
  }

  @Get()
  findAll(): Promise<LocationEntity[]> {
    return this.locationService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateLocationsDto,
  ) {
    this.locationService.update(id, dto);
    return { status: `Successfuly updated city: ${dto.city}` };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.locationService.delete(id);
  }
}
