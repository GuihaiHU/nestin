import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => {
          this.logger.log(`${req.method} - ${req.originalUrl} - ${Date.now() - now}ms`);
        }),
      )
      .pipe(
        catchError(err => {
          this.logger.error(`${req.method} - ${req.originalUrl} - ${Date.now() - now}ms`);
          return throwError(err);
        }),
      );
  }
}
