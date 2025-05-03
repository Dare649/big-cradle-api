import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { RequestAnalyticsService } from './request-analytics.service';
import { RequestAnalyticsDto } from 'src/dto/request-analytics.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorstor';



@ApiTags('RequestAnalytics')
@ApiBearerAuth('access-token')
@Controller('api/v1/request_analytics')
export class RequestAnalyticsController {
    constructor(
        private readonly request_analytics: RequestAnalyticsService
    ) {}

    @Post('create_request_analytics')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.BUSINESS, Role.USER)
    @ApiOperation({
        summary: 'This API create a  request_analytics'
    })
    async create_request_analytics(
        @Body() dto: RequestAnalyticsDto,
        @Body('data_file') base64_file?: string,
    ) {
        try {
            return this.request_analytics.create_request_analytics(dto, base64_file || '');
        } catch (error) {
            throw new BadRequestException(`Error creating  request type ${error.message}`);
        }
    }


    @Put('update_request_analytics/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.BUSINESS, Role.USER)
    @ApiOperation({
        summary: 'This API updates a  request type'
    })
    async update_request_analytics(
        @Param('id') id: string,
        @Body() dto: RequestAnalyticsDto,
        @Body() base64_file?: string,
    ) {
        try {
            return this.request_analytics.update_request_analytics(id, dto, base64_file);
        } catch (error) {
            throw new BadRequestException(`Error updating  ${error.message}`);
        }
    }


    @Put('update_request_analytics_status/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API updates a request analytics status'
    })
    async update_request_analytics_status(
        @Param('id') id: string,
    ) {
        try {
            return this.request_analytics.update_request_analytics_status(id);
        } catch (error) {
            throw new BadRequestException(`Error updating  ${error.message}`);
        }
    }


    @Delete('delete_request_analytics/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.BUSINESS,Role.USER)
    @ApiOperation({
        summary: 'This api allows the admin user to delete an existing  request type'
    })
    async delete_request_analytics(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.request_analytics.delete_request_analytics(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting  request type ${error.message}`);
        }
    }


    @Get('get_request_analytics/:id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets an existing  request_analytics by id'
    })
    async get_request_analytics(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.request_analytics.get_request_analytics_by_id(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type details: ${error.message}`);
        }
    }


    @Get('get_request_analytics/by_business/:business_user_id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets an existing  request analytics by business'
    })
    async get_request_analytics_by_business(
        @Param('business_user_id') user_id: string,
        @Param('page') page: number,
        @Param('limit') limit: number
    ): Promise<any> {
        try {
            return this.request_analytics.get_request_analytics_by_business(user_id, page, limit);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type details: ${error.message}`);
        }
    }

    @Get('get_request_analytics/by_bussiness_user/:user_id')
    @Roles(Role.ADMIN, Role.BUSINESS, Role.USER)
    @ApiOperation({
        summary: 'This api gets an existing  request analytics by users of a business'
    })
    async get_request_analytics_by_business_user(
        @Param('user_id') user_id: string,
        @Param('page') page: number,
        @Param('limit') limit: number
    ): Promise<any> {
        try {
            return this.request_analytics.get_request_analytics_by_user(user_id, page, limit);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type details: ${error.message}`);
        }
    }

    

    @Get('get_request_analytics')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets all existing request type'
    })
    async get_all_request_analytics(
        @Param('page') page: number,
        @Param('limit') limit: number
    ): Promise<any> {
        try {
            return this.request_analytics.get_all_request_analytics(page, limit);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type: ${error.message}`);
        }
    }


    @Get('get_total_request_analytics_count')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets all existing request type'
    })
    async get_total_request_analytics_count(
    ): Promise<any> {
        try {
            return this.request_analytics.get_total_request_analytics_count();
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type: ${error.message}`);
        }
    }

    @Get('get_total_request_analytics_count_by_user_id/:user_id')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets all existing request type'
    })
    async get_total_request_analytics_count_by_user_id(
        @Param('user_id') user_id: string,
    ): Promise<any> {
        try {
            return this.request_analytics.get_total_request_analytics_count_by_user_id(user_id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type: ${error.message}`);
        }
    }

    
}
