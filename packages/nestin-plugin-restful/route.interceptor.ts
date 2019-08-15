import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RestRouteInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest();
      const objClass = context.getClass();
      const objHandler = context.getHandler();
      console.log(req)
      console.log(objClass)
      console.log(objHandler)
    return next
      .handle();
  }
}