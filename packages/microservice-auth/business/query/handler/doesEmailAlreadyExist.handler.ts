import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { AccountEntity } from '@shitake/microservice-auth/infrastructure';
import { DoesEmailExistQuery } from '@shitake/microservice-auth/business/query';

@QueryHandler(DoesEmailExistQuery)
export class DoesEmailExistHandler implements IQueryHandler<DoesEmailExistQuery> {
  constructor(
    @InjectEntityManager('accountConnection')
    private readonly entityManager: EntityManager,
  ) {}

  async execute(query: DoesEmailExistQuery) {
    const accountRepo = this.entityManager.getRepository(AccountEntity);
    return (await accountRepo.count({ email: query.email })) > 0;
  }
}
