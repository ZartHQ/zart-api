// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  categoryName: string;

  @IsNotEmpty()
  subCategory: string[];

  @IsNotEmpty()
  description: string;
}


export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
