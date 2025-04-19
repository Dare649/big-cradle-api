import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type RequestTypeDocument = RequestType & Document;

@Schema({
    timestamps: true
})
export class RequestType {
    @Prop({
        required: true,
        unique: true
    })
    request_name: string;

    @Prop({
        required: true,
    })
    request_description: string;
}

export const RequestTypeSchema = SchemaFactory.createForClass(RequestType);