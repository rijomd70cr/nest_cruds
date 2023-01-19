import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDecerotor } from '../schema/userDecerotorSchema';

export type PublishDocument = mongoose.HydratedDocument<Publish>;

@Schema()
export class Publish {
  @Prop()
  title: String;

  @Prop()
  register_no: String;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop()
  version_no: String;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserDecorator' })
  created_by: UserDecerotor;

  @Prop({ default: false })
  is_publish: Boolean;

  @Prop({ default: false })
  is_release: Boolean;

  @Prop()
  doccuments: {
    dId: String;
    doccumenttitle: string;
    file: string;
    description: string;
  }[];
}

export const PublishSchema = SchemaFactory.createForClass(Publish);
