import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class RequestTypeDto {
    @ApiProperty({
        example: 'trend analysis',
    })
    @IsNotEmpty()
    @IsString()
    request_name: string;


    @ApiProperty({
        example: 'this request is trend analysis',
    })
    @IsNotEmpty()
    @IsString()
    request_description: string;

}