import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import ApiException from './error/api-exception';

export default class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const apiKey = headers['x-api-key'];
    if (apiKey === process.env.API_KEY) return true;
    throw ApiException.unauthenticated();
  }
}
