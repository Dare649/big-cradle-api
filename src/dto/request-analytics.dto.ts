import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class RequestAnalyticsDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of the user making the request',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    example: 'data_title',
    description: 'The title of the data being requested',
  })
  @IsNotEmpty()
  @IsString()
  data_title: string;

  @ApiProperty({
    example: 'data_description',
    description: 'A description of the data being requested',
  })
  @IsNotEmpty()
  @IsString()
  data_description: string;

  @ApiProperty({
    example: 'data_type',
    description: 'The type of data being requested',
  })
  @IsNotEmpty()
  @IsString()
  data_type: string;

  @ApiProperty({
    example: 'data_file',
    description: 'The file associated with the data request',
  })
  @IsNotEmpty()
  @IsString()
  data_file: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109ceb',
    description: 'The ID of the request type',
  })
  @IsNotEmpty()
  @IsString()
  request_type_id: string;

  @ApiProperty({
    example: 0,
    description: '1 indicates consent given, 0 indicates consent not given',
  })
  @IsNotEmpty()
  @IsEnum([0, 1])
  data_consent: number;
}