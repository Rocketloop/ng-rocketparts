import { Component, Input, ViewEncapsulation } from '@angular/core';
import { get } from 'lodash';

import { DynamicTableRowData } from '../../models/dynamic-table.model';
import { DynamicTableComponentCell } from '../dynamic-table-component-cell/dynamic-table-component-cell.component';
import { AbstractDynamicCellComponent } from '../../helpers';

@Component({
    selector: 'ngr-dynamic-table-link-cell',
    templateUrl: './dynamic-table-link-cell.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableLinkCellComponent extends AbstractDynamicCellComponent
    implements DynamicTableComponentCell {
    @Input()
    data: DynamicTableRowData;
    @Input()
    options: any;
    @Input()
    path: string;

    label = '';
    link = '';

    constructor() {
        super();
    }

    protected _updateComponent() {
        this.label = get(this.data, this.path) || this.options.label;
        this.link = get(this.data, this.options.linkPath as string);
    }
}
