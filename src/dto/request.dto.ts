import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from "@nestjs/swagger";

export class createRequestDto {
  @IsString()
  selectedDate: string; // 2024-03-15

  @IsString()
  selectedTimeSlot: string; // 09:00 am to 10:00 am
}

export class updateRequestDto extends PartialType(createRequestDto) {}
