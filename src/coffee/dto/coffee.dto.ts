import { IsNumber } from 'class-validator';
import { IsCoffee } from '../../is-coffee.decorator';

export class CoffeeDto {
  @IsCoffee()
  @IsNumber()
  drink: string;
}
