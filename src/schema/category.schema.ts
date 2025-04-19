import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type CategoryDocument = Category & Document;

@Schema({
    timestamps: true
})
export class Category {
    @Prop({
        required: true,
        unique: true
    })
    category_name: string;

    @Prop({
        required: true,
    })
    category_description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);