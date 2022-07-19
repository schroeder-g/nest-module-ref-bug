import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IsCoffee } from '../is-coffee.decorator';
import { RequestService } from '../request/request.service';
import { CoffeeDto } from './dto/coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(
    @Inject(RequestService) private readonly requestService: RequestService,
  ) {}

  @Post()
  checkDrink(@Body() body: CoffeeDto) {
    console.log(body);
    return this.requestService.getIsCoffee();
  }
}
