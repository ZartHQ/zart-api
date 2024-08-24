import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/locations.entity';
import { Repository } from 'typeorm';
import { createLocationsDto } from 'src/dto';
import { updateLocationsDto } from 'src/dto';
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

  async findByCity(city: string) {
    const result = await this.locationRepo.findOne({ where: { city } });
    if (!result) throw new NotFoundException('Location not found!');
    return result;
  }

  //findById
  async updateById(id: number, dto: updateLocationsDto) {
    const result = await this.locationRepo.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException('Location not found!');
    }
    return { status: 'success', result };
  }

  //updateByCity

  //Delete
}
