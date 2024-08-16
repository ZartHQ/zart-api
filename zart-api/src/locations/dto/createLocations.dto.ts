import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class createLocationsDto {
  @IsString()
  @IsNotEmpty()
  area: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
