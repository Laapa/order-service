import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  buyerId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);