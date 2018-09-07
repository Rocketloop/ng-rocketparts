import { Pipe, PipeTransform } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

/**
 * Async pipe which has a pass through for strings
 */
@Pipe({ name: 'maybeAsync', pure: false })
export class MaybeAsyncPipe extends AsyncPipe implements PipeTransform {
  transform<T>(obj: null): null;
  transform<T>(obj: undefined): undefined;
  transform<T>(obj: string): any;
  transform<T>(obj: Observable<T> | Promise<T>): T | null;
  transform(
    obj: Observable<any> | Promise<any> | string | null | undefined
  ): any {
    if (typeof obj === 'string' || obj instanceof String) {
      return obj;
    }
    return super.transform(obj as Observable<any>);
  }
}
