import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createRequestDto, updateRequestDto } from "src/dto";
import { RequestEntity } from "src/entities/request.entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly requestRepo: Repository<RequestEntity>
  ) {}

  async createRequest(dto: createRequestDto): Promise<RequestEntity> {
    const request = this.requestRepo.create(dto);
    await request.save();
    return request;
  }

  async findAllRequests(): Promise<RequestEntity[]> {
    const data = await this.requestRepo.find();
    if (data.length === 0) {
      throw new HttpException("No Content!", HttpStatus.NO_CONTENT);
    }
    return data;
  }

  async findById(id: number): Promise<RequestEntity> {
    const data = await this.requestRepo.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`Request with id ${id} not found!`);
    }
    return data;
  }

  async updateRequest(
    id: number,
    dto: updateRequestDto
  ): Promise<RequestEntity> {
    const request = await this.requestRepo.preload({
      id,
      ...dto,
    });
    if (!request) {
      throw new NotFoundException(`Request with ID: ${id} not found!`);
    }
    return this.requestRepo.save(request);
  }

  async deleteRequest(id: number): Promise<void> {
    await this.requestRepo.delete(id);
  }
}
