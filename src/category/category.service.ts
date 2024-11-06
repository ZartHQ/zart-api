import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCategoryDto, UpdateCategoryDto } from "src/dto/category.dto";
import { Category } from "src/entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) {}

  addCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  findAllCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findOneCategory(id: number): Promise<Category> {
    return await this.categoryRepo.findOneBy({ id });
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepo.preload({
      id,
      ...dto,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID: ${id} not found!`);
    }

    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepo.delete(id);
  }
}
