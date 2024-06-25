import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { EntityManager } from 'typeorm';
interface ExtendedRequest extends Request {
  entityManager: EntityManager;
}
@Injectable()
export class EntityManagerMiddleware implements NestMiddleware {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    console.log(req);
    req.entityManager = this.entityManager;
    next();
  }
}
