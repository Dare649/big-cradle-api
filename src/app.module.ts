import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { RequestTypeModule } from './request-type/request-type.module';
import { RequestAnalyticsModule } from './request-analytics/request-analytics.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    CloudinaryModule,
    AuthModule,
    CategoryModule,
    RequestTypeModule,
    RequestAnalyticsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
