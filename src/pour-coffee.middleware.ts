import {
  Inject,
  Injectable,
  NestMiddleware,
  OnModuleInit,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { RequestService } from './request/request.service';

@Injectable()
export class PourCoffeeMiddleware implements NestMiddleware {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(REQUEST) private request: Request,
    @Inject(RequestService) private requestService: RequestService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('wuah', req.body);
    this.requestService.setIsCoffee(req.body.drink);
    console.log(this.requestService.getIsCoffee());
    next();
  }
}
