import { Injectable, BadRequestException, Logger  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RequestAnalytics, RequestAnalyticsDocument } from 'src/schema/request-analytics.schema';
import { RequestAnalyticsDto } from 'src/dto/request-analytics.dto';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';


@Injectable()
export class RequestAnalyticsService {
    private readonly logger = new Logger(RequestAnalyticsService.name);
    constructor(
        @InjectModel(RequestAnalytics.name) private request_analytics_model:Model<RequestAnalyticsDocument>,
        private cloudinary_service: CloudinaryService,
    ) {}


    
    // create request analytics
    async create_request_analytics(dto: RequestAnalyticsDto, base64_file: string) {

        let file_url: string;

        // Validate the base64 string format
        if (!base64_file || !base64_file.startsWith('data:')) {
            throw new BadRequestException('Invalid file format. Please provide a valid base64-encoded.');
        }

        try {
            const public_id = `user_profiles/${Date.now()}`;
            const upload_result = await this.cloudinary_service.uploadFile(base64_file, public_id);
            file_url = upload_result.secure_url;
        } catch (error) {
            this.logger.error('Error uploading file:', error);
            throw new BadRequestException('Failed to upload file.');
        }

        try {
            const request_analytics = new this.request_analytics_model({
                ...dto,
                data_file: file_url,
                status: 'pending',
            });

            const saved_request_analytics = await request_analytics.save();

            return {
                success: true,
                message: 'Request analytics created successfully', 
                data: saved_request_analytics,
            };
        } catch (error) {
            this.logger.error('Error creating request analytics:', error);
            throw new BadRequestException('Failed to create request analytics.');
        }   
    }


    // update request analytics
    async update_request_analytics(id: string, dto: RequestAnalyticsDto, base64_file?: string) {
        try {
            const updated_request_analytics = await this.request_analytics_model.findById(id).exec();


            if (!updated_request_analytics) {
                throw new BadRequestException('Request analytics not found.');
            }

            let file_url = updated_request_analytics.data_file; // Keep the existing file URL

            if (base64_file && typeof base64_file === 'string') {
                // Validate the base64 string format
                if (!base64_file.startsWith('data')) {
                    throw new BadRequestException('Invalid file format. Please provide a valid base64-encoded.');
                }

                try {
                    const public_id = `user_profiles/${Date.now()}`;
                    const upload_result = await this.cloudinary_service.uploadFile(base64_file, public_id);
                    file_url = upload_result.secure_url; // Update the file URL
                } catch (error) {
                    this.logger.error('Error uploading file:', error);
                    throw new BadRequestException('Failed to upload file.');
                }
            }

            // Update the request analytics with the new data
            Object.assign(updated_request_analytics, dto, { data_file: file_url });

            await updated_request_analytics.save();

            return {
                success: true,
                message: 'Request analytics updated successfully',
                data: updated_request_analytics,
            };

        }   catch (error) {
            this.logger.error('Error updating request analytics:', error);
            throw new BadRequestException('Failed to update request analytics.');
        }
    }


    // delete request analytics
    async delete_request_analytics(id: string) {
        try {
            const deleted_request_analytics = await this.request_analytics_model.findByIdAndDelete(id).exec();

            if (!deleted_request_analytics) {
                throw new BadRequestException('Request analytics not found.');
            }

            return {
                success: true,
                message: 'Request analytics deleted successfully',
            };
        } catch (error) {
            this.logger.error('Error deleting request analytics:', error);
            throw new BadRequestException('Failed to delete request analytics.');
        }
    }


    // get request analytics by id
    async get_request_analytics_by_id(id: string) {
        try {
            const request_analytics = await this.request_analytics_model.findById(id).exec();

            if (!request_analytics) {
                throw new BadRequestException('Request analytics not found.');
            }

            return {
                success: true,
                message: 'Request analytics retrieved successfully',
                data: request_analytics,
            };
        } catch (error) {
            this.logger.error('Error retrieving request analytics:', error);
            throw new BadRequestException('Failed to retrieve request analytics.');
        }
    }


    // get all request analytics with pagination
    async get_all_request_analytics(page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;
            const request_analytics = await this.request_analytics_model.find().skip(skip).limit(limit).exec();

            return {
                success: true,
                message: 'All request analytics retrieved successfully',
                data: request_analytics,
            };
        } catch (error) {
            this.logger.error('Error retrieving all request analytics:', error);
            throw new BadRequestException('Failed to retrieve all request analytics.');
        }
    }


    async get_request_analytics_by_business(business_user_id: string, page: number, limit: number) {
        try {
          const skip = (page - 1) * limit;
      
          const [data, total] = await Promise.all([
            this.request_analytics_model
              .find({ business_user_id })
              .skip(skip)
              .limit(limit)
              .exec(),
            this.request_analytics_model.countDocuments({ business_user_id }),
          ]);
      
          return {
            success: true,
            message: 'Request analytics by user ID retrieved successfully',
            data,
            pagination: {
              total,
              page,
              limit,
              pages: Math.ceil(total / limit),
            },
          };
        } catch (error) {
          this.logger.error('Error retrieving request analytics by user ID:', error);
          throw new BadRequestException('Failed to retrieve request analytics by user ID.');
        }
      }


    async get_request_analytics_by_user(user_id: string, page: number, limit: number) {
        try {
          const skip = (page - 1) * limit;
      
          const [data, total] = await Promise.all([
            this.request_analytics_model
              .find({ user_id })
              .skip(skip)
              .limit(limit)
              .exec(),
            this.request_analytics_model.countDocuments({ user_id }),
          ]);
      
          return {
            success: true,
            message: 'Request analytics by user ID retrieved successfully',
            data,
            pagination: {
              total,
              page,
              limit,
              pages: Math.ceil(total / limit),
            },
          };
        } catch (error) {
          this.logger.error('Error retrieving request analytics by user ID:', error);
          throw new BadRequestException('Failed to retrieve request analytics by user ID.');
        }
      }
      


    // get total request analytics count
    async get_total_request_analytics_count() {
        try {
            const count = await this.request_analytics_model.countDocuments().exec();

            return {
                success: true,
                message: 'Total request analytics count retrieved successfully',
                data: count,
            };
        } catch (error) {
            this.logger.error('Error retrieving total request analytics count:', error);
            throw new BadRequestException('Failed to retrieve total request analytics count.');
        }
    }


    // get total request analytics count by user id
    async get_total_request_analytics_count_by_user_id(user_id: string) {
        try {
            const count = await this.request_analytics_model.countDocuments({ user_id }).exec();

            return {
                success: true,
                message: 'Total request analytics count by user ID retrieved successfully',
                data: count,
            };
        } catch (error) {
            this.logger.error('Error retrieving total request analytics count by user ID:', error);
            throw new BadRequestException('Failed to retrieve total request analytics count by user ID.');
        }
    }

    // update the request status 
    async update_request_analytics_status(id: string) {
        try {
            const request = await this.request_analytics_model.findById(id);

            if (!request) {
            throw new BadRequestException('Request analytics not found.');
            }

            let new_status: 'pending' | 'in progress' | 'completed';

            switch (request.status) {
            case 'pending':
                new_status = 'in progress';
                break;
            case 'in progress':
                new_status = 'completed';
                break;
            case 'completed':
                return {
                success: false,
                message: 'Request is already completed.',
                data: request,
                };
            default:
                throw new BadRequestException('Invalid status value.');
            }

            request.status = new_status;
            const updated = await request.save();

            return {
            success: true,
            message: `Status updated to ${new_status}`,
            data: updated,
            };
        } catch (error) {
            this.logger.error('Error updating request status:', error);
            throw new BadRequestException('Failed to update request status.');
        }
    }


}
