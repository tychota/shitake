import { RegisterAccountHandler } from './registerAccount.handler';
import { LoginCommandHandler } from './login.handler';

export const AuthCommandHandlers = [RegisterAccountHandler, LoginCommandHandler];
