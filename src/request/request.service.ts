import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private isCoffee: boolean;

  setIsCoffee(drink: string) {
    this.isCoffee = [
      'mocha',
      'espresso',
      'latte',
      'half calf',
      'americano',
    ].includes(drink);
  }

  getIsCoffee(): boolean {
    return this.isCoffee;
  }
}
