import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'XYZ Company',
    description: 'Name of the business',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  business_name: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the contact person',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contact_name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Contact number of the user',
  })
  @IsString()
  @IsNotEmpty()
  contact_number: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Business address of the user',
  })
  @IsString()
  @IsNotEmpty()
  business_address: string;

  @ApiProperty({
    example: 'New York',
    description: 'City of the business',
  })
  @IsString()
  @IsNotEmpty()
  business_city: string;

    @ApiProperty({
        example: 'NY',
        description: 'State of the business',
    })
    @IsString()
    @IsNotEmpty()
    business_state: string;
    
    @ApiProperty({
        example: 'Information Technology',
        description: 'Sector of the business',
    })
    @IsString()
    @IsNotEmpty()
    sector: string;

    @ApiProperty({
        example: '1 - 10',
        description: 'The number of employees in the business',
    })
    @IsString()
    @IsNotEmpty()
    organization_size: string;

    @ApiProperty({
        example: 'USA', 
        description: 'Country of the business',
    })
    @IsString()
    @IsNotEmpty()
    business_country: string;


    @ApiProperty({
        example: 'USA', 
        description: 'Company businness email',
    })
    @IsString()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        example: 'business',
        description: 'Role of the user',
    })
    @IsString()
    @IsNotEmpty()
    role: string;


    @ApiProperty({
        example: 'password123',
        description: 'Password for the user account',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: "Password too short, it should be a minimum of 8 characters." })
    @MaxLength(15, { message: "Password too long, it should be a maximum of 15 characters." })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, {
        message: 'Password too weak',
    })
    password: string;

    @ApiProperty({
        example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... (truncated)',
        description: 'Base64-encoded user profile image',
    })
    @IsString()
    @IsNotEmpty()
    user_img: string;

}