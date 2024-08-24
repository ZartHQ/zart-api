import { PartialType } from '@nestjs/mapped-types';
import { createLocationsDto } from './createLocations.dto';
export class updateLocationsDto extends PartialType(createLocationsDto) {}
