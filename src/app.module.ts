import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveriesModule } from './deliveries/deliveries.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@app/iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { AccessTokenGuard } from '@app/iam/authentication/guards/access-token.guard';
import { AuthenticationGuard } from '@app/iam/authentication/guards/authentication.guard';
import { RolesGuard } from '@app/iam/authorization/guards/roles.guard';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    DeliveriesModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    CartModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AccessTokenGuard,
    AppService
  ],
})
export class AppModule { }
