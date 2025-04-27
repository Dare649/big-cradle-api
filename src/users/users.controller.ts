import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/decorators/roles.decorstor';
import { Role } from 'src/enum/roles.enum';
import { CreateUserDto } from 'src/dto/create-user.dto';



@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Users')
@ApiBearerAuth('access-token') 
@Controller('/api/v1/users')
export class UsersController {
    constructor(
        private readonly user_service: UsersService
    ) {}

    @Post('create_user')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api allows users to update their profile'
    })
    async create_user(
        @Body() dto: CreateUserDto,
    ): Promise<any> {
        try {
            return await this.user_service.create_user(dto.business_user_id, dto, dto.user_img)
        } catch (error) {
            throw new BadRequestException(`Error updating user ${error.message}`);
        }
    }


    @Put('update_user/:id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api allows users to update their profile'
    })
    async update_user(
        @Param('id') id: string,
        @Body() dto: CreateUserDto,
        @Body('user_img') base64_image?: string,
    ): Promise<any> {
        try {
            return await this.user_service.update_user(id, dto, base64_image)
        } catch (error) {
            throw new BadRequestException(`Error updating user ${error.message}`);
        }
    }


    @Delete('delete_user/:id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api allows the admin user to delete an existing user'
    })
    async delete_user(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.user_service.delete_user(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting user ${error.message}`);
        }
    }



    @Get('get_user/:id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets an existing user by id'
    })
    async get_user(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.user_service.get_user(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving user details: ${error.message}`);
        }
    }


    @Get('get_user_by_business/:business_user_id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets an existing user by business_user_id'
    })
    async get_user_by_business(
        @Param('business_user_id') business_user_id: string
    ): Promise<any> {
        try {
            return this.user_service.get_users_by_business(business_user_id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving users: ${error.message}`);
        }
    }


    @Get('get_users')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets all the existing users'
    })
    async get_users() {
        try {
            return this.user_service.get_users();
        } catch (error) {
            throw new BadRequestException(`Error retrieving users: ${error.message}`);
        }
    }



    @Get('total_count')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'Gets the total users count for dashboard',
    })
    async getTotalUserCount() {
        try {      
            return this.user_service.get_total_user_count();
        } catch (error) {
            throw new BadRequestException(`Error attaching users: ${error.message}`);
        }
    }
}
