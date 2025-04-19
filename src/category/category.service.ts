import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDto } from 'src/dto/category.dto';
import { Category, CategoryDocument } from 'src/schema/category.schema';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);

    constructor(
        @InjectModel(Category.name) private category_model: Model<CategoryDocument>,
    ) {}


    // create  category
    async create_category(dto: CategoryDto) {
        try {
            const category = new this.category_model({
                ...dto
            });

            const saved_category = await category.save();

            return {
                success: true,
                message: ' category created successfully!',
                data: saved_category
            }
        } catch (error) {
            this.logger.error(`Error creating  category: ${error.message}`);
            throw new BadRequestException('Error creating  category, try again');
        }
    }

    // update  category
    async update_category(id: string, dto: CategoryDto) {
        try {
            const existing_category = await this.category_model.findById(id).exec();

            if (!existing_category) {
                throw new BadRequestException(' category does not exist');
            }

            Object.assign(existing_category, dto);
            await existing_category.save();

            return {
                success: true,
                message: ' category updated successfully!',
                data: existing_category
            };
        } catch (error) {
            this.logger.error(`Error updating  category: ${error.message}`);
            throw new BadRequestException('Error updating  category, try again');
        }
    }


    // get  category by id
    async get_category(id: string): Promise<any> {
        try {
            const category = await this.category_model.findById(id).exec();

            if (!category) {
                throw new BadRequestException(" category does not exist");
            }

            return {
                success: true,
                message: " category retrieved successfully!",
                data: category
            }
        } catch (error) {
            this.logger.error(`Error retrieving  category: ${error.message}`);
            throw new BadRequestException('Error retrieving  category, try again');
        }
    }


    // get  category by id
    async delete_category(id: string): Promise<any> {
        try {
            const category = await this.category_model.findByIdAndDelete(id).exec();

            if (!category) {
                throw new BadRequestException(" category does not exist");
            }

            return {
                success: true,
                message: " category deleted successfully!",
            }
        } catch (error) {
            this.logger.error(`Error deleting  category: ${error.message}`);
            throw new BadRequestException('Error deleting  category, try again');
        }
    }


    async get_categories() {
        try {
            const category = await this.category_model.find().exec();

            return {
                success: true,
                message: " categories retrieved successfully",
                data: category
            }
        } catch (error) {
            this.logger.error(`Error retrieving  categories: ${error.message}`);
            throw new BadRequestException('Error retrieving  categories, try again');
        }
    }



}
