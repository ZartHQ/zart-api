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
    const data = this.locationService.create(dto);
    return data;
  }

  @Get(':city')
  find(@Param('city') city: string) {
    const data = this.locationService.findByCity(city);
    return data;
  }

  @Get()
  findAll(): Promise<LocationEntity[]> {
    const data = this.locationService.findAll();
    return data;
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
