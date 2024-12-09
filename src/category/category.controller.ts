import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateCategoryDto, UpdateCategoryDto } from "src/dto/category.dto";
import { CategoryService } from "./category.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Category")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const response = this.categoryService.addCategory(createCategoryDto);
      return {
        status: true,
        message: "Category Created",
        data: response,
      };
    } catch (error) {
      return {
        status: false,
        message: "An error occured while creating a category",
        error,
      };
    }
  }

  @Get()
  findAll() {
    try {
      const findAllCategories = this.categoryService.findAllCategories();
      return {
        status: true,
        message: "Categories Retrieved Successfully",
        data: findAllCategories,
      };
    } catch (error) {
      return {
        status: false,
        message: "An error occured while finding all categories",
        error,
      };
    }
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    try {
      const findCategory = this.categoryService.findOneCategory(+id);
      return {
        status: true,
        message: "Category Retrieved Successfully",
        data: findCategory,
      };
    } catch (error) {
      return {
        status: false,
        message: "An error occured while finding a category",
        error,
      };
    }
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    try {
      const updateCategory = this.categoryService.updateCategory(
        +id,
        updateCategoryDto
      );
      return {
        status: true,
        message: "Category Updated Successfully",
        data: updateCategory,
      };
    } catch (error) {
      return {
        status: false,
        message: "An error occured while updating a category",
        error,
      };
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    try {
      const removeCategory = this.categoryService.deleteCategory(+id);
      return {
        status: true,
        message: "Category deleted Successfully",
        data: removeCategory,
      };
    } catch (error) {
      return {
        status: false,
        message: "An error occured while deleting a category",
        error,
      };
    }
  }
}
