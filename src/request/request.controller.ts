import { Controller, Post } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from 'src/dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {

  @Post()
  createRequest(@Body() dto: CreateRequestDto) {
    return this.requestService.createRequest(dto);
  }
  }
}
