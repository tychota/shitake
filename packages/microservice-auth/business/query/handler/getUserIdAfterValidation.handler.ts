import argon2 from 'argon2';

import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { AccountEntity } from '@shitake/microservice-auth/infrastructure';
import { GetUserIdAfterValidationQuery } from '@shitake/microservice-auth/business/query';

import { GrpcPermissionDeniedException } from '@shitake//utils-grpc/exception';

@QueryHandler(GetUserIdAfterValidationQuery)
export class GetUserIdAfterValidationHandler implements IQueryHandler<GetUserIdAfterValidationQuery> {
  public constructor(
    @InjectEntityManager('accountConnection')
    private readonly entityManager: EntityManager,
  ) {}

  public async execute(query: GetUserIdAfterValidationQuery) {
    const accountRepo = this.entityManager.getRepository(AccountEntity);

    const accountThatMatchedEmail = await accountRepo.findOne({ email: query.authCredentialsDto.email });
    if (!accountThatMatchedEmail) {
      throw new GrpcPermissionDeniedException('Email or password is incorrect.');
    }

    const hashedPassword = accountThatMatchedEmail.hashedPassword;
    const passwordValid = await argon2.verify(hashedPassword, query.authCredentialsDto.password);
    if (!passwordValid) {
      throw new GrpcPermissionDeniedException('Email or password is incorrect.');
    }

    return accountThatMatchedEmail.id;
  }
}
