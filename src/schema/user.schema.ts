import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enum/roles.enum";
import { Document } from "mongoose";


export type UserDocument = User & Document;


@Schema({ timestamps: true })
export class User {
    @Prop({
        required: true,
    })
    business_name: string;

    @Prop({
        required: true
    })
    contact_name: string;

    @Prop({
        required: true
    })
    contact_number: string;

    @Prop({
        required: true
    })
    business_address: string;

    @Prop({
        required: true
    })
    business_city: string;

    @Prop({
        required: true
    })
    business_state: string;

    @Prop({
        required: true
    })
    business_country: string;

    @Prop({
        required: true
    })
    sector: string;

    @Prop({
        required: true
    })
    organization_size: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop({
        required: true,
        default: Role.BUSINESS,
        enum: Role
    })
    role: Role;

    @Prop({
        required: true
    })
    hash: string;

    @Prop({
        required: true
    })
    user_img: string;

    @Prop({
        default: false,
    })
    is_verified: boolean;

    @Prop({
        required: true,
        default: true,
    })
    is_active: boolean;

    @Prop()
    otp?: string;

    @Prop()
    otp_expires_at?: Date;
}


export const UserSchema = SchemaFactory.createForClass(User);