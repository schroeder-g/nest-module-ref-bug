import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { RequestService } from './request/request.service';
import { RequestModule } from './request/request.module';
import { PourCoffeeMiddleware } from './pour-coffee.middleware';

@Module({
  imports: [CoffeeModule, RequestModule],
  controllers: [AppController],
  providers: [AppService, RequestService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PourCoffeeMiddleware).forRoutes('*');
  }
}
