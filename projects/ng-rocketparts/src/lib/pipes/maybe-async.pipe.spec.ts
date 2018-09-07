import { ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';

import { MaybeAsyncPipe } from './maybe-async.pipe';

describe('[Pipe]: MaybeAsyncPipe', () => {
  let pipe: MaybeAsyncPipe;
  const ref = jasmine.createSpyObj<ChangeDetectorRef>('ChangeDetectorRef', [
    'markForCheck'
  ]);

  beforeEach(() => {
    pipe = new MaybeAsyncPipe(ref);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('#transform', () => {
    it('should return string value passed as it is', () => {
      const message = 'string message';
      expect(pipe.transform(message)).toEqual(
        message,
        `Expected value to be '${message}'`
      );
    });

    it('should return unwrapped value from Observable', () => {
      const message = 'observable message';
      const observableMessage = of(message);

      expect(pipe.transform(observableMessage)).toEqual(
        message,
        `Expected value from Observable to be unwrapped and equal ${message}`
      );
    });
  });
});
