import { Module } from '@nestjs/common';
import { IsCoffeeValidator } from '../is-coffee.decorator';
import { RequestModule } from '../request/request.module';
import { RequestService } from '../request/request.service';
import { CoffeeController } from './coffee.controller';

@Module({
  controllers: [CoffeeController],
  imports: [RequestModule],
  providers: [IsCoffeeValidator, RequestService],
})
export class CoffeeModule {}
