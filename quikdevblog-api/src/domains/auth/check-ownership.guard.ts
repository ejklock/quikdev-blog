import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { EntityManager, FindOneOptions, ObjectLiteral } from 'typeorm';

interface ExtendedRequest extends Request {
  entityManager: EntityManager;
  user: any;
}

@Injectable()
export class CheckOwnershipGuard implements CanActivate {
  constructor(private readonly entityName: string) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<ExtendedRequest>();
    const user = request.user;
    const entityId = +request.params.id; // Supondo que o id do recurso esteja nos parâmetros da rota

    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    const entityManager = request.entityManager;

    if (!entityManager) {
      return false;
    }

    const entity = entityManager.getRepository(this.entityName).target;

    const options: FindOneOptions<ObjectLiteral> = {
      where: {
        id: entityId,
        userId: user.sub,
      },
    };

    const resource = await entityManager.findOne(entity, options);

    return resource?.userId === user.sub;
  }
}
