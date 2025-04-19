import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";



export class CategoryDto {
    @ApiProperty({
        example: 'finance',
    })
    @IsNotEmpty()
    @IsString()
    category_name: string;


    @ApiProperty({
        example: 'this category is financial analysis',
    })
    @IsNotEmpty()
    @IsString()
    category_description: string;

}