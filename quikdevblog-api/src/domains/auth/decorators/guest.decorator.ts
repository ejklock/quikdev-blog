import { SetMetadata } from '@nestjs/common';

export const IS_GUEST_ROUTE = 'isGuestRoute';
export const Guest = () => SetMetadata(IS_GUEST_ROUTE, true);
