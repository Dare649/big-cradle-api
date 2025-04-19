import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestTypeDto } from 'src/dto/request-type.dto';
import { RequestType, RequestTypeDocument } from 'src/schema/request-type.schema';

@Injectable()
export class RequestTypeService {
    private readonly logger = new Logger(RequestTypeService.name);

    constructor(
        @InjectModel(RequestType.name) private request_type_model: Model<RequestTypeDocument>,
    ) {}


    // create  request_type
    async create_request_type(dto: RequestTypeDto) {
        try {
            const request_type = new this.request_type_model({
                ...dto
            });

            const saved_request_type = await request_type.save();

            return {
                success: true,
                message: ' request_type created successfully!',
                data: saved_request_type
            }
        } catch (error) {
            this.logger.error(`Error creating  request_type: ${error.message}`);
            throw new BadRequestException('Error creating  request type, try again');
        }
    }

    // update  request_type
    async update_request_type(id: string, dto: RequestTypeDto) {
        try {
            const existing_request_type = await this.request_type_model.findById(id).exec();

            if (!existing_request_type) {
                throw new BadRequestException(' request type does not exist');
            }

            Object.assign(existing_request_type, dto);
            await existing_request_type.save();

            return {
                success: true,
                message: ' request_type updated successfully!',
                data: existing_request_type
            };
        } catch (error) {
            this.logger.error(`Error updating  request_type: ${error.message}`);
            throw new BadRequestException('Error updating  request type, try again');
        }
    }


    // get  request_type by id
    async get_request_type(id: string): Promise<any> {
        try {
            const request_type = await this.request_type_model.findById(id).exec();

            if (!request_type) {
                throw new BadRequestException(" request type does not exist");
            }

            return {
                success: true,
                message: " request_type retrieved successfully!",
                data: request_type
            }
        } catch (error) {
            this.logger.error(`Error retrieving  request_type: ${error.message}`);
            throw new BadRequestException('Error retrieving  request_type, try again');
        }
    }


    // get  request_type by id
    async delete_request_type(id: string): Promise<any> {
        try {
            const request_type = await this.request_type_model.findByIdAndDelete(id).exec();

            if (!request_type) {
                throw new BadRequestException(" request type does not exist");
            }

            return {
                success: true,
                message: " request_type deleted successfully!",
            }
        } catch (error) {
            this.logger.error(`Error deleting  request_type: ${error.message}`);
            throw new BadRequestException('Error deleting  request type, try again');
        }
    }


    // get all request types with pagination
    async get_all_request_types() {
        try {
            const request_type = await this.request_type_model.find().exec();

            return {
                success: true,
                message: " request_types retrieved successfully",
                data: request_type
            }
        } catch (error) {
            this.logger.error(`Error retrieving  request_types: ${error.message}`);
            throw new BadRequestException('Error retrieving  request_types, try again');
        }
    }



}
