import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputComponent } from './password-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('Component: PasswordInputComponent', () => {
    let component: PasswordInputComponent;
    let fixture: ComponentFixture<PasswordInputComponent>;
    let element: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [PasswordInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordInputComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should change input type with a click on the icon', () => {
        expect(element.querySelector('input').type).toBe('password');

        element.querySelector('i').click();
        fixture.detectChanges();
        expect(element.querySelector('input').type).toBe('text');

        element.querySelector('i').click();
        fixture.detectChanges();
        expect(element.querySelector('input').type).toBe('password');
    });

    it('should change an icon with a click on it', () => {
        expect(element.querySelector('i').classList).toContain('fa-eye');

        element.querySelector('i').click();
        fixture.detectChanges();
        expect(element.querySelector('i').classList).toContain('fa-eye-slash');

        element.querySelector('i').click();
        fixture.detectChanges();
        expect(element.querySelector('i').classList).toContain('fa-eye');
    });
});
