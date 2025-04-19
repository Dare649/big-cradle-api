import { Module } from '@nestjs/common';
import { RequestTypeService } from './request-type.service';
import { RequestTypeController } from './request-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestType, RequestTypeSchema } from 'src/schema/request-type.schema';  



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RequestType.name, schema: RequestTypeSchema }
    ]),
  ],
  providers: [RequestTypeService],
  controllers: [RequestTypeController],
  exports: [
    MongooseModule.forFeature([
      { name: RequestType.name, schema: RequestTypeSchema }
    ]),
  ]
})
export class RequestTypeModule {}
