import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
    private readonly locationRepo: Repository<LocationEntity>
  ) {}

  async createlocation(dto: createLocationsDto): Promise<LocationEntity> {
    const location = this.locationRepo.create(dto);
    await location.save();
    return location;
  }

  async findAllLocations(): Promise<LocationEntity[]> {
    const data = await this.locationRepo.find();
    if (data.length === 0) {
      throw new HttpException('No Content!', HttpStatus.NO_CONTENT);
    }
    return data;
  }

  async findByCity(city: string) {
    const data = await this.locationRepo.find({ where: { city } });
    if (data.length === 0) throw new NotFoundException('No city found!');
    return data;
  }

  async updateLocation(id: number, dto: updateLocationsDto) {
    const location = await this.locationRepo.preload({
      id,
      ...dto,
    });
    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found!`);
    }
    return this.locationRepo.save(location);
  }

  async deleteLocation(id: number) {
    await this.locationRepo.delete(id);
    return { status: `Successfully deleted city with id: ${id}` };
  }
}
