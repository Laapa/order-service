import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '@orders/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from '@orders/order.dto';
import { firstValueFrom } from 'rxjs';
import { userClient } from '@orders/user-client.provider';
import { productClient } from '@orders/product-client.provider';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const user = await firstValueFrom(
      userClient.send({ cmd: 'getUserById' }, dto.buyerId),
    );
    if (!user) {
      throw new RpcException({ statusCode: 404, message: 'Пользователь не найден' });
    }

    const product = await firstValueFrom(
      productClient.send({ cmd: 'getProductById' }, dto.productId),
    );
    if (!product) {
      throw new RpcException({ statusCode: 404, message: 'Продукт не найден' });
    }

    const order = new this.orderModel(dto);
    return order.save();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderModel.findById(id).exec();
  }
}