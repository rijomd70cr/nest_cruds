import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PublishService } from './publish.service';
import { PublishController } from './publish.controller';

import { PublishSchema } from '../schema/publishSchema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Publish', schema: PublishSchema }]),
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: 'Publish',
    //     useFactory: () => {
    //       const schema = PublishSchema;
    //       schema.plugin(require('mongoose-autopopulate'));
    //       return schema;
    //     },
    //   },
    // ]),
  ],
  controllers: [PublishController],
  providers: [PublishService],
})
export class PublishModule {}
