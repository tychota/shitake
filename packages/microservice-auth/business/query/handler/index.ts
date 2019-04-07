import { DoesEmailExistHandler } from './doesEmailAlreadyExist.handler';
import { GetUserIdAfterValidationHandler } from './getUserIdAfterValidation.handler';

export const AuthQueryHandlers = [DoesEmailExistHandler, GetUserIdAfterValidationHandler];
