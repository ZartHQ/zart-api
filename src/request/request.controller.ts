import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { RequestService } from "./request.service";
import { createRequestDto, updateRequestDto } from "src/dto";
import { RequestEntity } from "src/entities/request.entity";
import { ApiOperation } from "@nestjs/swagger";

@Controller("request")
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: "Create Request" })
  create(@Body() dto: createRequestDto): Promise<RequestEntity> {
    return this.requestService.createRequest(dto);
  }

  @Get()
  @ApiOperation({ summary: "Get All Request" })
  findAll() {
    return this.requestService.findAllRequests();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get Request By Id" })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.requestService.findById(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update Request By Id" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: updateRequestDto) {
    return this.requestService.updateRequest(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Update Request By Id" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.requestService.deleteRequest(id);
  }
}
