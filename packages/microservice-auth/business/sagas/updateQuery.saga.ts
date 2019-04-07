import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountRegistredEvent, LoggedInEvent } from '@shitake/microservice-auth/domain/event';
import { AccountEntity } from '@shitake/microservice-auth/infrastructure';
import { RefreshTokenEntity } from '../../infrastructure/persistance/entity/refreshToken.entity';

@Injectable()
export class AuthSagas {
  constructor(
    @InjectEntityManager('accountConnection')
    private readonly entityManager: EntityManager,
  ) {}

  @Saga()
  accountRegistred = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(AccountRegistredEvent),
      map(event => {
        const accountRepo = this.entityManager.getRepository(AccountEntity);
        accountRepo.save({ id: event.uuid, email: event.data.email, hashedPassword: event.data.hashedPassword });
      }),
    );
  };

  @Saga()
  loggedIn = (events$: Observable<any>): Observable<void> => {
    return events$.pipe(
      ofType(LoggedInEvent),
      map(event => {
        const refreshTokenRepo = this.entityManager.getRepository(RefreshTokenEntity);
        refreshTokenRepo.save({ id: event.uuid, refreshToken: event.refreshToken });
      }),
    );
  };
}
