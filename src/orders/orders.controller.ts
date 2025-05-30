import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrdersService } from '@orders/orders.service';
import { CreateOrderDto } from '@orders/order.dto';
import { Order } from '@orders/order.schema';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(data: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(data);
  }

  @MessagePattern({ cmd: 'getOrderById' })
  async getOrderById(id: string): Promise<Order | null> {
    return this.ordersService.getOrderById(id);
  }
}