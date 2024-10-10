import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class createLocationsDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

export class updateLocationsDto extends PartialType(createLocationsDto) {}
