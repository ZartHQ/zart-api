import { Module } from "@nestjs/common";
import { RequestService } from "./requestArtisan.service";
import { RequestArtisanController } from "./requestArtisan.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestArtisanEntity } from "src/entities/requestArtisan.entity";

@Module({
  controllers: [RequestArtisanController],
  providers: [RequestService],
  imports: [TypeOrmModule.forFeature([RequestArtisanEntity])],
})
export class RequestArtisanModule {}
