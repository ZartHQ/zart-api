import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createRequestArtisanDto, updateRequestArtisanDto } from "src/dto";
import { RequestArtisanEntity } from "src/entities/requestArtisan.entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestArtisanEntity)
    private readonly requestRepo: Repository<RequestArtisanEntity>
  ) {}

  async createRequest(
    dto: createRequestArtisanDto
  ): Promise<RequestArtisanEntity> {
    const request = this.requestRepo.create(dto);
    await request.save();
    return request;
  }

  async findAllRequests(): Promise<RequestArtisanEntity[]> {
    const data = await this.requestRepo.find();
    if (data.length === 0) {
      throw new HttpException("No Content!", HttpStatus.NO_CONTENT);
    }
    return data;
  }

  async findById(id: number): Promise<RequestArtisanEntity> {
    const data = await this.requestRepo.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`Request with id ${id} not found!`);
    }
    return data;
  }

  async updateRequest(
    id: number,
    dto: updateRequestArtisanDto
  ): Promise<RequestArtisanEntity> {
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
