import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicTableRowData } from '../models/dynamic-table.model';

export abstract class AbstractDynamicCellComponent implements OnChanges {
    @Input()
    data: DynamicTableRowData;
    @Input()
    path: string;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['data'] || (changes['path'] && this.data && this.path)) {
            this._updateComponent();
        }
    }

    protected abstract _updateComponent(...args);
}
