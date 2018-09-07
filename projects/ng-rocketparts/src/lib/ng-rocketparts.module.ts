import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumberInputModule } from './components/number-input/number-input.module';
import { MaybeAsyncPipe } from './pipes/maybe-async.pipe';

const MODULES = [NumberInputModule];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [MaybeAsyncPipe],
    exports: [...MODULES, MaybeAsyncPipe]
})
export class NgRocketPartsModule {}
