import { NgModule } from '@angular/core';
import { MaybeAsyncPipe } from './pipes/maybe-async.pipe';
import { PasswordInputModule } from './components/password-input/password-input.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MODULES = [PasswordInputModule];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [MaybeAsyncPipe],
    exports: [...MODULES, MaybeAsyncPipe]
})
export class NgRocketPartsModule {}
