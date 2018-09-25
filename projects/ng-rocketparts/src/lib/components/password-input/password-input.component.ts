import {
    Component,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PASSWORD_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordInputComponent), // tslint:disable-line
    multi: true
};

@Component({
    selector: 'ngr-password-input',
    templateUrl: './password-input.component.html',
    styleUrls: ['./password-input.component.scss'],
    providers: [PASSWORD_INPUT_VALUE_ACCESSOR]
})
export class PasswordInputComponent implements OnInit, ControlValueAccessor {
    @HostBinding('class.ngr-password-input')
    passwordInputClass = true;

    @Input()
    placeholder: string;

    @Input()
    paddingLeft: number;

    onChange: () => void;

    onTouched: () => void;

    input: any;

    displayValue: string;

    disabled: boolean;

    show: boolean;

    constructor(private elem: ElementRef) {}

    ngOnInit() {
        this.input = this.elem.nativeElement.querySelector('input');
        this.show = this.input.type === 'password';
    }

    registerOnChange(fn: any): void {
        this.onChange = () => {
            if (fn) {
                fn(this.displayValue);
            }
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: any): void {
        if (this.displayValue !== value) {
            this.displayValue = value;
        }
    }

    /**
     * Called when the selection changed
     * @param value
     */
    onInputChange(value: string) {
        this.displayValue = value;
        if (this.onChange) {
            this.onChange();
        }
    }

    /**
     * Allows to show and hide password
     * @param {Event} e
     */
    toggle(e: Event) {
        this.show = !this.show;
        this.input.type = this.input.type === 'password' ? 'text' : 'password';
    }
}
