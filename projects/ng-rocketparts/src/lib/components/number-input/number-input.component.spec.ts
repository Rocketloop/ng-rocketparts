import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import { typeInElement, dispatchFakeEvent } from '../../../testing';
import { NumberInputComponent } from './number-input.component';

@Component({
    template: `<ngr-number-input
               [formControl]="control"
               [placeholder]="'Enter a number'"
               [min]="10"
               [max]="1000"></ngr-number-input>
            `
})
export class SimpleNumberInputComponent {
    control = new FormControl();
}

describe('[Component]: NumberInputComponent', () => {
    // Creates a test component fixture.
    function createComponent<T>(component: Type<T>) {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [NumberInputComponent, component]
        });
        TestBed.compileComponents();

        return TestBed.createComponent<T>(component);
    }

    describe('forms integration', () => {
        let fixture: ComponentFixture<SimpleNumberInputComponent>;
        let input: HTMLInputElement;

        beforeEach(() => {
            fixture = createComponent(SimpleNumberInputComponent);
            fixture.detectChanges();
            input = fixture.debugElement.query(By.css('input')).nativeElement;
        });

        it('should update control value as user types with input value', () => {
            typeInElement('10', input);
            fixture.detectChanges();

            expect(fixture.componentInstance.control.value).toEqual(
                10,
                `Expected control value to be updated as user types.`
            );

            typeInElement('100', input);
            fixture.detectChanges();

            expect(fixture.componentInstance.control.value).toEqual(
                100,
                `Expected control value to be updated as user types.`
            );
        });

        it('should format input value on blur', fakeAsync(() => {
            typeInElement('300', input);
            dispatchFakeEvent(input, 'blur');
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '300.00',
                `Expected input value to be formatted on blur.`
            );

            typeInElement('3000', input);
            dispatchFakeEvent(input, 'blur');
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '3,000.00',
                `Expected input value to be formatted on blur.`
            );
        }));

        it('should fill input correctly if control value is set programatically', fakeAsync(() => {
            fixture.componentInstance.control.setValue(100);
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '100.00',
                `Expected input to fill with control current formatted value.`
            );

            fixture.componentInstance.control.setValue(1000);
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '1,000.00',
                `Expected input to fill with control current formatted value.`
            );
        }));

        it('should clear the input value if control value is reset programatically', fakeAsync(() => {
            typeInElement('200', input);
            fixture.detectChanges();
            tick();

            fixture.componentInstance.control.reset();
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '',
                `Expected input value to be empty after control reset.`
            );
        }));

        it('should mark the control as dirty as user types', () => {
            expect(fixture.componentInstance.control.dirty).toBe(
                false,
                `Expected control to start out pristine.`
            );

            typeInElement('20', input);
            fixture.detectChanges();

            expect(fixture.componentInstance.control.dirty).toBe(
                true,
                `Expected control to become dirty when the user types into the input.`
            );
        });

        it('should not mark the control dirty when the value is set programmatically', () => {
            expect(fixture.componentInstance.control.dirty).toBe(
                false,
                `Expected control to start out pristine.`
            );

            fixture.componentInstance.control.setValue('200');
            fixture.detectChanges();

            expect(fixture.componentInstance.control.dirty).toBe(
                false,
                `Expected control to stay pristine if value is set programmatically.`
            );
        });

        it('should clear input value on blur if invalid input was provided', fakeAsync(() => {
            typeInElement('invalid', input);
            fixture.detectChanges();
            tick();

            dispatchFakeEvent(input, 'blur');
            fixture.detectChanges();
            tick();

            expect(input.value).toEqual(
                '',
                `Expected input value to be cleared on blur.`
            );
        }));
    });
});
