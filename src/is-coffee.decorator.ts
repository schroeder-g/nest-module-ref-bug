import {
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { RequestService } from './request/request.service';
import { Request } from 'express';

@ValidatorConstraint({ name: 'IsCoffeeValidator', async: true })
@Injectable()
export class IsCoffeeValidator
  implements ValidatorConstraintInterface, OnModuleInit
{
  private requestService: RequestService;
  constructor(
    @Inject(REQUEST) private request: Request,
    // @Inject(RequestService) private requestService: RequestService, // A normal DI doesn't work
    private moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    const contextId = ContextIdFactory.getByRequest(this.request);
    console.log('In onModuleInit'); // Doesn't get called, presumably because this is dependent upon a request-scoped service(?)
    this.requestService = await this.moduleRef.resolve(
      RequestService,
      contextId,
      { strict: false },
    );
  }
  async validate(type: string, { object }: ValidationArguments) {
    const contextId = ContextIdFactory.getByRequest(this.request);
    this.requestService = await this.moduleRef.resolve( // Fails with "cannot read property resolve of undefined" 
      RequestService,
      contextId,
      { strict: false },
    );
    console.log('Coffee type validator', this.requestService.getIsCoffee());
    if (this.requestService.getIsCoffee()) {
      return true;
    }
  }

  defaultMessage({ object }: ValidationArguments) {
    return `msg.`;
  }
}

export function IsCoffee(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCoffee',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsCoffeeValidator,
    });
  };
}
