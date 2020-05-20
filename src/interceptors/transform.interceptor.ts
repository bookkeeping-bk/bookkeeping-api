import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ResponseResult } from '@/interfaces/response-result.interface';
import { responseLogger } from '@/utils/logger';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();

        const url = request.originalUrl;
        const successResponse: ResponseResult = { data, message: '' };
        responseLogger.info(url, successResponse);
        return successResponse;
      }),
    );
  }
}
