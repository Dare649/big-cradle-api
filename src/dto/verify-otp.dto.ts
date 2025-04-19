import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class VerifyOtpDto {
    @ApiProperty({
        example: 'example@mail.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;


    @ApiProperty({
        example: 2035
    })
    @IsString()
    @IsNotEmpty()
    otp: string
}