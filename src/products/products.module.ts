import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from '@app/shared';
import { ProductsService } from './products.service';
import { ShopsModule } from './shops/shops.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'products-service'
        }
      },
    ]),
    ShopsModule,
    CategoriesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule { }
