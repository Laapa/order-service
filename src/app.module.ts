import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { OrdersModule } from '@orders/orders.module';
import { Order, OrderSchema } from '@orders/order.schema';
import { OrdersController } from '@orders/orders.controller';
import { OrdersService } from '@orders/orders.service';
import { userClient } from '@orders/user-client.provider';
import { productClient } from '@orders/product-client.provider';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/order-service'),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: 'USER_SERVICE',
      useValue: userClient,
    },
    {
      provide: 'PRODUCT_SERVICE',
      useValue: productClient,
    },
  ],
})
export class AppModule {}
