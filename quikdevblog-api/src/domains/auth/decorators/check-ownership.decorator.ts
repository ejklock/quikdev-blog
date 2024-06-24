import { applyDecorators, UseGuards } from '@nestjs/common';
import { CheckOwnershipGuard } from '../check-ownership.guard';

export function CheckOwnership(entity: string) {
  return applyDecorators(UseGuards(new CheckOwnershipGuard(entity)));
}
