import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './locations.entity';
import { Repository } from 'typeorm';
import { createLocationsDto } from './dto';
import { updateLocationsDto } from './dto/updateLocations.dto';
@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
  ) {}

  async create(dto: createLocationsDto): Promise<LocationEntity> {
    const location = this.locationRepo.create(dto);
    await location.save();
    return location;
  }

  async findAll(): Promise<LocationEntity[]> {
    return await this.locationRepo.find();
  }

  async findByArea(area: string) {
    const result = await this.locationRepo.findOne({ where: { area } });
    if (!result) throw new NotFoundException('Location not found!');
    return result;
  }

  async update(id: string, dto: updateLocationsDto) {
    const result = await this.locationRepo.update(id, dto);
    return { status: 'success', result };
  }
}
