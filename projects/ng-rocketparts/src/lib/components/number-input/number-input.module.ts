import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumberInputComponent } from './number-input.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [NumberInputComponent],
    exports: [NumberInputComponent]
})
export class NumberInputModule {}
