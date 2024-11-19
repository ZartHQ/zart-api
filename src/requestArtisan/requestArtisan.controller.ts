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
import { RequestService } from "./requestArtisan.service";
import { createRequestArtisanDto, updateRequestArtisanDto } from "src/dto";
import { RequestArtisanEntity } from "src/entities/requestArtisan.entity";
import { ApiOperation } from "@nestjs/swagger";

@Controller("request")
export class RequestArtisanController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  @ApiOperation({ summary: "Create Request" })
  create(@Body() dto: createRequestArtisanDto): Promise<RequestArtisanEntity> {
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
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: updateRequestArtisanDto
  ) {
    return this.requestService.updateRequest(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Update Request By Id" })
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.requestService.deleteRequest(id);
  }
}
