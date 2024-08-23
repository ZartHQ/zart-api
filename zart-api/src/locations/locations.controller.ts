import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { createLocationsDto } from './dto';
import { LocationEntity } from './locations.entity';
import { updateLocationsDto } from './dto/updateLocations.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post()
  create(@Body() dto: createLocationsDto): Promise<LocationEntity> {
    const location = this.locationService.create(dto);
    return location;
  }

  @Get()
  findAll(): Promise<LocationEntity[]> {
    const locations = this.locationService.findAll();
    return locations;
  }

  @Get(':area')
  findByCity(@Param('area') areaParam: string): Promise<LocationEntity> {
    const area = this.locationService.findByCity(areaParam);
    return area;
  }
  // Get By Id

  @Patch(':id')
  updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: updateLocationsDto,
  ) {
    const result = this.locationService.updateById(id, dto);
    return result;
  }
  // Patch By Area
}
