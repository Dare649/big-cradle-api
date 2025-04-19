import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { RequestTypeService } from './request-type.service';
import { RequestTypeDto } from 'src/dto/request-type.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorstor';



@ApiTags('RequestType')
@ApiBearerAuth('access-token')
@Controller('api/v1/request_type')
export class RequestTypeController {
    constructor(
        private readonly request_type: RequestTypeService
    ) {}

    @Post('create_request_type')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API create a  request_type'
    })
    async create_request_type(
        @Body() dto: RequestTypeDto,
    ) {
        try {
            return this.request_type.create_request_type(dto);
        } catch (error) {
            throw new BadRequestException(`Error creating  request type ${error.message}`);
        }
    }


    @Put('update_request_type/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This API updates a  request type'
    })
    async update_request_type(
        @Param('id') id: string,
        @Body() dto: RequestTypeDto,
    ) {
        try {
            return this.request_type.update_request_type(id, dto);
        } catch (error) {
            throw new BadRequestException(`Error updating  ${error.message}`);
        }
    }


    @Delete('delete_request_type/:id')
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api allows the admin user to delete an existing  request type'
    })
    async delete_request_type(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.request_type.delete_request_type(id);
        } catch (error) {
            throw new BadRequestException(`Error deleting  request type ${error.message}`);
        }
    }


    @Get('get_request_type/:id')
    @Roles(Role.ADMIN)
    @ApiOperation({
        summary: 'This api gets an existing  request_type by id'
    })
    async get_request_type(
        @Param('id') id: string
    ): Promise<any> {
        try {
            return this.request_type.get_request_type(id);
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type details: ${error.message}`);
        }
    }

    

    @Get('get_all_request_type')
    @Roles(Role.ADMIN, Role.BUSINESS)
    @ApiOperation({
        summary: 'This api gets all existing request type'
    })
    async get_all_request_types(
    ): Promise<any> {
        try {
            return this.request_type.get_all_request_types();
        } catch (error) {
            throw new BadRequestException(`Error retrieving  request type: ${error.message}`);
        }
    }
}
