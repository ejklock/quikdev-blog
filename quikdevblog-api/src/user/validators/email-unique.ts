import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailIsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UsersService) {}

  async validate(value: string) {
    return await this.userService.findOneByEmail(value).then((user) => !user);
  }

  defaultMessage() {
    return 'Email already in use';
  }
}

export function UserEmailIsUnique(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [EmailIsUniqueConstraint],
      validator: EmailIsUniqueConstraint,
    });
  };
}
