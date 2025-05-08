import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';

export class RequestAnalyticsDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of the business (business_user_id) attached to a user or the ID of the business or the admin user  making the request',
  })
  @IsNotEmpty()
  @IsString()
  business_user_id: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of user making the request',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: 'finacial analysis of XYZ company for the year 2023',
    description: 'The title of the data being requested',
  })
  @IsNotEmpty()
  @IsString()
  data_title: string;

  @ApiProperty({
    example: 'this is a request for a financial analysis of XYZ company so as the provide better decision making',
    description: 'A description of the data being requested',
  })
  @IsNotEmpty()
  @IsString()
  data_description: string;

  @ApiProperty({
    example: 'data:file/pdf;base64,iVBORw0KGgoAAAANSUhEUgAA... (truncated)',
    description: 'Base64-encoded user profile image',

  })
  @IsNotEmpty()
  @IsString()
  data_file: string;

  @ApiProperty({
    example: 'data:file/pdf;base64,iVBORw0KGgoAAAANSUhEUgAA... (truncated)',
    description: 'Base64-encoded user profile image',

  })
  @IsOptional()
  @IsString()
  completed_data_file: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of the request type',
  })
  @IsNotEmpty()
  @IsString()
  request_type_id: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of the category',
  })
  @IsNotEmpty()
  @IsString()
  category_id: string;

  @ApiProperty({
    example: 0,
    description: '1 indicates consent given, 0 indicates consent not given',
  })
  @IsNotEmpty()
  @IsEnum([0, 1])
  data_consent: number;
}