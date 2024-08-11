import { IsBoolean, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  area: string;

  @IsBoolean()
  active: boolean;
}
