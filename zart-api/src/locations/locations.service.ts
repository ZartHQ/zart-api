import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from './locations.entity';
import { Repository } from 'typeorm';
import { LocationDto } from './dto/locations.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepo: Repository<LocationEntity>,
  ) {}

  async create(dto: LocationDto): Promise<LocationEntity> {
    const location = this.locationRepo.create(dto);
    await location.save();
    return location;
  }

  async findAll(): Promise<LocationEntity[]> {
    return await this.locationRepo.find();
  }

  async findByArea(area: string) {
    return await this.locationRepo.findOne({ where: { area } });
  }
}
