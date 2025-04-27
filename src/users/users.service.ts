import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import * as argon from 'argon2';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Role } from 'src/enum/roles.enum';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);


    constructor(
        @InjectModel(User.name) private user_model: Model<UserDocument>,
        private cloudinary_service: CloudinaryService,
    ) {}


    async create_user(creator_id: string, dto: CreateUserDto, base64_image: string): Promise<any> {
        this.logger.log(`Attempting to find creator by ID: ${creator_id}`);
      
        try {
          // Validate image
          if (!base64_image || !base64_image.startsWith('data:image/')) {
            throw new BadRequestException('Invalid user image. Please provide a valid base64-encoded image.');
          }
      
          // Upload image
          let image_url: string;
          try {
            const public_id = `user_profiles/${Date.now()}`;
            const upload_result = await this.cloudinary_service.uploadImage(base64_image, public_id);
            image_url = upload_result.secure_url;
          } catch (error) {
            this.logger.error('Error uploading user image:', error);
            throw new BadRequestException('Failed to upload user image.');
          }
      
          // Get the creator (admin or business user)
          const creator = await this.user_model.findById(creator_id).exec();
      
          if (!creator) {
            this.logger.error(`Creator not found with ID: ${creator_id}`);
            throw new BadRequestException('Creator user not found.');
          }
      
          this.logger.log(`Creator found: ${creator.email} (${creator.role})`);
      
          if (![Role.ADMIN, Role.BUSINESS].includes(creator.role)) {
            throw new BadRequestException('Only admins or business users can create users.');
          }
      
          // Check for existing user
          const existing_user = await this.user_model.findOne({ email: dto.email }).exec();
          if (existing_user) {
            throw new BadRequestException('User with this email already exists.');
          }
      
          // Hash password
          const hash = await argon.hash(dto.password);
      
          // Create new user
          const new_user = new this.user_model({
            ...dto,
            hash,
            user_img: image_url,
            role: Role.USER,
            is_verified: true,
            is_active: true,
            business_user_id: creator._id,
          });
      
          const saved_user = await new_user.save();
      
          this.logger.log(`New user created: ${saved_user.email} (ID: ${saved_user._id})`);
      
          return {
            success: true,
            message: 'User created successfully.',
            data: saved_user,
          };
        } catch (error) {
          this.logger.error(`Error creating user: ${error.message}`, error.stack);
          throw new BadRequestException(`An error occurred while creating user: ${error.message}`);
        }
    }
      
      
      

    async update_user(id: string, dto: CreateUserDto, base64_image?: string): Promise<any> {
        try {
            const existing_user = await this.user_model.findById(id).exec();

            if (!existing_user) {
                throw new BadRequestException('User does not exist');
            }

            let image_url = existing_user.user_img;

            // Handle image upload if provided
            if (base64_image) {
                if (!base64_image.startsWith('data:image/')) {
                    throw new BadRequestException('Invalid user image. Provide a valid base64-encoded image');
                }

                try {
                    const public_id = `user_profiles/${Date.now()}`;
                    const upload_result = await this.cloudinary_service.uploadImage(base64_image, public_id);
                    image_url = upload_result.secure_url;
                } catch (error) {
                    this.logger.error('Error uploading user image', error);
                    throw new BadRequestException('Failed to upload user image', error);
                }
            }


            // Hash and update password if provided
            if (dto.password) {
                const hashedPassword = await argon.hash(dto.password);
                existing_user.hash = hashedPassword;
            }

            // Dynamically assign fields from DTO except password
            const { password, ...rest } = dto;
            Object.assign(existing_user, rest, {
            user_img: image_url
            });

    
            await existing_user.save();

            return {
                success: true,
                message: 'User updated successfully!',
            };
        } catch (error) {
            this.logger.error(`Error updating user: ${error.message}`);
            throw new BadRequestException('An error occurred while updating user.');
        }
    }


    // delete user
    async delete_user(id: string): Promise<any> {
        try {
            const delete_user = await this.user_model.findByIdAndDelete(id).exec();

            if (!delete_user) {
                throw new BadRequestException('User does not exist');
            }


            return {
                success: true,
                message: 'User deleted successfully!'
            }
        } catch (error) {
            this.logger.error(`Error deleting user: ${error.message}`);
            throw new BadRequestException('An error occured while deleting user');
        }
    }


    // get user by ID
    async get_user(id: string): Promise<any> {
        try {
            const user = await this.user_model.findById(id).exec();

            if (!user) {
                throw new BadRequestException('User does not exist');
            }

            return {
                success: true,
                message: 'User retrieved successfully!',
                data: user
            }
        } catch (error) {
            this.logger.error(`Error retrieving user: ${error.message}`);
            throw new BadRequestException('An error occured while retrieving the user.');
        }
    }


    // get users
    async get_users() {
        try {
            const users = await this.user_model.find().exec();

            return {
                success: true,
                message: 'Users retrieved successfully!',
                data: users
            }
        } catch (error) {
            this.logger.error(`Error retrieving users: ${error.message}`);
            throw new BadRequestException('An error occured while retrieving users.');            
        }
    }


    // ✅ Get Total business user Count
    async get_total_user_count(): Promise<any> {
        try {
            const total_count = await this.user_model.countDocuments({ role: 'business' }).exec();
            return {
                success: true,
                message: "Total business users count retrieved successfully",
                data: total_count
            };
        } catch (error) {
            this.logger.error("Error retrieving total business users count:", error);
            throw new BadRequestException("Error retrieving total business users count: " + error.message);
        }
    }


    async get_users_by_business(business_user_id: string) {
        try {
            // Log the input ID for debugging purposes
            this.logger.log(`Fetching users for business with ID: ${business_user_id}`);
    
            // Ensure the query checks for users with role 'USER' and the correct business_user_id
            const users = await this.user_model.find({
                business_user_id, // Filtering users by business_user_id
                role: Role.USER         // Ensuring only users (not businesses or admins) are returned
            }).exec();
    
            // Log the result size for debugging purposes
            this.logger.log(`Found ${users.length} users for business with ID: ${business_user_id}`);
    
            return {
                success: true,
                message: 'Users attached to business retrieved successfully!',
                data: users,
            };
        } catch (error) {
            this.logger.error("Error retrieving business users:", error);
            throw new BadRequestException("Error retrieving business users: " + error.message);
        }
    }
    
  


}
