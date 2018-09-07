import { CommonModule } from '@angular/common';
import { NgModule, InjectionToken } from '@angular/core';

import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { DynamicTableRowComponent } from './components/dynamic-table-row/dynamic-table-row.component';
import { DynamicTableCellComponent } from './components/dynamic-table-cell/dynamic-table-cell.component';
import { DynamicTableComponentCellComponent } from './components/dynamic-table-component-cell/dynamic-table-component-cell.component';
import { DynamicTableLinkCellComponent } from './components/dynamic-table-link-cell/dynamic-table-link-cell.component';
import { DynamicTableDecoratorService } from './services/dynamic-table-decorator.service';
import {
    registerInjectionTokenForComponentType,
    ComponentRegistries
} from './helpers/dynamic-component.helper';

// @todo Add type checking
// Currently build fails if new InjectionToken<DynamicTableComponentCellType>(`TABLE_CELL:LINK`);
export const DYNAMIC_TABLE_LINK_CELL = new InjectionToken(`TABLE_CELL:LINK`);

registerInjectionTokenForComponentType(
    ComponentRegistries.TABLE_CELL,
    'link',
    DYNAMIC_TABLE_LINK_CELL
);

const COMPONENTS = [
    DynamicTableComponent,
    DynamicTableRowComponent,
    DynamicTableCellComponent,
    DynamicTableComponentCellComponent,
    DynamicTableLinkCellComponent
];

const ENTRY_COMPONENTS = [DynamicTableLinkCellComponent];

@NgModule({
    imports: [CommonModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    entryComponents: ENTRY_COMPONENTS,
    providers: [
        DynamicTableDecoratorService,
        {
            provide: DYNAMIC_TABLE_LINK_CELL,
            useValue: DynamicTableLinkCellComponent
        }
    ]
})
export class DynamicTableModule {}
