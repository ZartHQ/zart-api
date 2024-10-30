import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestEntity } from 'src/entities/request.entity';
import { CreateRequestDto } from 'src/dto';
@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepo: Repository<RequestEntity>
  ) {}

  async createRequest(dto: CreateRequestDto): Promise<RequestEntity> {
    const request = this.requestRepo.create( dto );
    await request.save();
    return this.requestRepo.save(request);
  }
}

