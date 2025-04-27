import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enum/roles.enum";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    business_name?: string;

    @Prop()
    contact_name?: string;

    @Prop()
    contact_number?: string;

    @Prop()
    business_address?: string;

    @Prop()
    business_city?: string;

    @Prop()
    business_state?: string;

    @Prop()
    business_country?: string;

    @Prop()
    sector?: string;

    @Prop()
    first_name?: string;

    @Prop()
    last_name?: string;

    @Prop()
    department?: string;

    @Prop()
    organization_size?: string;

    @Prop({
        required: true,
        unique: true
    })
    email?: string;

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

    @Prop()
    user_img?: string;

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

    @Prop()
    business_user_id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
