import { Module } from "@nestjs/common";
import { RequestService } from "./request.service";
import { RequestController } from "./request.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestEntity } from "src/entities/request.entity";

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [TypeOrmModule.forFeature([RequestEntity])],
})
export class RequestModule {}
