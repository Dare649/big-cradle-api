import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/dto/category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorstor';



@ApiTags('Category')
@ApiBearerAuth('access-token')
@Controller('api/v1/category')
export class CategoryController {
    constructor(
        private readonly category: CategoryService
    ) {}

    @Post('create_category')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API create a  category'
    })
    async create_category(
        @Body() dto: CategoryDto,
    ) {
        try {
            return this.category.create_category(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating  category ${error.message}`);
        }
    }


    @Put('update_category/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API updates a  category'
    })
    async update_category(
        @Param('id') id: string,
        @Body() dto: CategoryDto,
    ) {
        try {
            return this.category.update_category(id, dto);
        } catch (error) {
            throw new BadRequestException(`Error updating  ${error.message}`);
        }
    }


    @Delete('delete_category/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api allows the admin user to delete an existing  category'
    })
    async delete_category(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.category.delete_category(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting  category ${error.message}`);
        }
    }


    @Get('get_category/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets an existing  category by id'
    })
    async get_category(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.category.get_category(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  category details: ${error.message}`);
        }
    }

    

    @Get('get_categoryies')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets all existing  categories'
    })
    async get__categories(
    ): Promise<any> {
        try {
            return this.category.get_categories();
        } catch (error) {
            throw new BadRequestException(`Error retrieving  categories: ${error.message}`);
        }
    }
}
