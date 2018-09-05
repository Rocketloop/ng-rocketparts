import { TestBed } from '@angular/core/testing';

import { NgRocketPartsModule } from './ng-rocketparts.module';

describe(`NgRocketPartsModule`, () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgRocketPartsModule]
        });
    });

    it(`should do nothing`, () => {
        expect(true).toBeTruthy();
    });
});
