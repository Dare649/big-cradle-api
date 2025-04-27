import { ApiProperty } from '@nestjs/swagger';
import {  Matches, MaxLength, MinLength, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
    @ApiProperty({
        example: 'Larry',
        description: 'this is the users first name'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    first_name: string;

    @ApiProperty({
        example: 'Daniels',
        description: 'this is the users last name'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    last_name: string;

    @ApiProperty({
        example: 'finance',
        description: 'this is the users current department'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    department: string;


    @ApiProperty({
        example: 'larry@mail.com', 
        description: 'users email',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '60d0fe4f5311236168a109ceb', 
        description: 'business ID that is creating the user',
    })
    @IsString()
    @IsNotEmpty()
    business_user_id: string;

    


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
        example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
        description: 'Base64-encoded user profile image',
    })
    @IsString()
    @IsNotEmpty()
    user_img: string;
}