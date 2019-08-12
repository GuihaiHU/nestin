import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SegmentInterceptor implements NestInterceptor {
  private reflector: Reflector;
  constructor() {
    this.reflector = new Reflector();
  }

  private getInfoAsSegment(obj, segments) {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && segments.indexOf(key) !== -1) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const segments = this.reflector.get<string[]>('responseSegment', context.getHandler());
        if (segments) {
          if (data instanceof Array) {
            return data.map(item => this.getInfoAsSegment(item, segments));
          } else {
            return this.getInfoAsSegment(data, segments);
          }
        }
        return data;
      }),
    );
  }
}
