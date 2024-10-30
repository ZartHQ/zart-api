import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @IsNotEmpty()
  @IsString()
  selectedDate: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}

export class UpdateRequestDto extends PartialType(CreateRequestDto) {}
