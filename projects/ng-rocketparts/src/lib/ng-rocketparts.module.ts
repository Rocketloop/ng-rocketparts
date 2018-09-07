import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DynamicTableModule } from './components/dynamic-table/dynamic-table.module';
import { MaybeAsyncPipe } from './pipes/maybe-async.pipe';

const MODULES = [DynamicTableModule];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ...MODULES],
    declarations: [MaybeAsyncPipe],
    exports: [...MODULES, MaybeAsyncPipe]
})
export class NgRocketPartsModule {}
