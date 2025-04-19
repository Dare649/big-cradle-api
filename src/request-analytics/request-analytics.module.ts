import { Module } from '@nestjs/common';
import { RequestAnalyticsService } from './request-analytics.service';
import { RequestAnalyticsController } from './request-analytics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestAnalytics, RequestAnalyticsSchema } from 'src/schema/request-analytics.schema'; 
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestAnalytics.name, schema: RequestAnalyticsSchema },
    ]),
  ],
  providers: [RequestAnalyticsService, CloudinaryService],
  controllers: [RequestAnalyticsController],
  exports: [
      MongooseModule.forFeature([
        { name: RequestAnalytics.name, schema: RequestAnalyticsSchema }
      ]),
    ]
})
export class RequestAnalyticsModule {}
