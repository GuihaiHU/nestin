import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfigService } from 'nestjs-config';
import { Response } from '../response';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private reflector: Reflector;
  constructor(readonly configService: ConfigService) {
    this.reflector = new Reflector();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const action = getAction(context.getHandler());
    return next.handle()
    // const query = context.switchToHttp().getRequest().query;
    // if (action === CrudActions.ReadAll) {
    //   query.page = query.page || 1;
    //   query.limit = query.limit || this.configService.get('crud.limit');
    //   query.offset = (query.page - 1) * query.limit;
    //   return next.handle().pipe(
    //     map(data => {
    //       return {
    //         data: data.data || [],
    //         meta: { total: data.total, size: data.count, page: data.page, pageCount: data.pageCount },
    //         status: 'success',
    //       };
    //     }),
    //   );
    // } else {
    //   return next.handle().pipe(
    //     map(data => {
    //       const responseStyle = this.reflector.get<string>('responseStyle', context.getHandler());
    //       if (responseStyle === 'plain') {
    //         return data;
    //       } else {
    //         return data instanceof Response ? data : new Response(data);
    //       }
    //     }),
    //   );
    // }
  }
}
