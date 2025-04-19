import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type RequestAnalyticsDocument = RequestAnalytics & Document;

@Schema({
    timestamps: true
})
export class RequestAnalytics {
    @Prop({
        required: true,
    })
    user_id: string;

    @Prop({
        required: true,
    })
    data_title: string;

    @Prop({
        required: true,
    })
    data_description: string;

    @Prop({
        required: true,
    })
    data_type: string;

    @Prop({
        required: true,
    })
    data_file: string;

    @Prop({
        required: true,
    })
    request_type_id: string;

    @Prop({
        required: true,
        type: Number,
        default: 0,
        enum: [0, 1], 
    })
    data_consent: number;

}


export const RequestAnalyticsSchema = SchemaFactory.createForClass(RequestAnalytics);