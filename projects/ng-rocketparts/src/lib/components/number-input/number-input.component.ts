import {
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Output,
    Inject,
    LOCALE_ID
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';
import { formatNumber } from '@angular/common';

export const NUMBER_INPUT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent), // tslint:disable-line
    multi: true
};

export const NUMBER_INPUT_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputComponent), // tslint:disable-line
    multi: true
};

@Component({
    selector: 'ngr-number-input',
    templateUrl: './number-input.component.html',
    styles: [],
    providers: [NUMBER_INPUT_VALUE_ACCESSOR, NUMBER_INPUT_VALIDATOR]
})
export class NumberInputComponent
    implements OnInit, ControlValueAccessor, Validator {
    @HostBinding('class.ngr-number-input')
    numberInputClass = true;

    @Input()
    placeholder: string;

    @Input()
    min: number;

    @Input()
    max: number;

    @Output()
    blur: EventEmitter<void> = new EventEmitter();

    onChange: () => void;

    onTouched: () => void;

    value: number | string;

    displayValue: string;

    disabled: boolean;

    constructor(@Inject(LOCALE_ID) private locale: string) {}

    ngOnInit() {}

    writeValue(value: number): void {
        if (this.value !== value) {
            this.value = value;
            this._updateDisplayValue();
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = () => {
            if (fn) {
                fn(this.value);
            }
        };
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /**
     * Validates the filter control
     */
    validate(c: AbstractControl): ValidationErrors | any {
        return !isNaN(+this.value) &&
            (!this.min || this.value >= this.min) &&
            (!this.max || this.value <= this.max)
            ? null
            : {
                  numberInput: 'Invalid value specified.'
              };
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /**
     * Called when the selection changed
     * @param value
     */
    onInputChange(value: string) {
        this.displayValue = value;
        let prepValue = value;

        prepValue = prepValue.replace(',', '.');

        const newValue = prepValue.match(/^\d+(\.\d+)?$/)
            ? parseFloat(prepValue)
            : value
                ? value
                : null;

        if (this.value !== newValue && this.onChange) {
            this.value = newValue;
            this.onChange();
        }
    }

    /**
     * Called when the user removes focus from the field
     */
    onBlur() {
        this._updateDisplayValue();
    }

    private _updateDisplayValue() {
        const value = parseFloat(`${this.value}`);

        this.displayValue = Number.isNaN(value)
            ? ''
            : formatNumber(value, this.locale, '.2-2');
    }
}
