import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {
    DynamicTableColumn,
    DynamicTableConfig,
    DynamicTableData,
    DynamicTableRowData,
    DynamicTableSortConfig,
    DynamicTableSortOrder
} from '../../models/dynamic-table.model';

@Component({
    selector: 'ngr-dynamic-table',
    templateUrl: './dynamic-table.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableComponent implements OnInit, OnChanges {
    /* Component Classes */

    SORT_ORDER = DynamicTableSortOrder;

    @HostBinding('class.ngr-dynamic-table')
    dynamicTableClass = true;

    /* Inputs */

    @Input()
    config: DynamicTableConfig;

    @Input()
    data: DynamicTableData[];

    @Input()
    emptyMessage = 'NO DATA TO DISPLAY';

    @Input()
    loadingMessage = 'LOADING DATA...';

    @Input()
    sort: DynamicTableSortConfig;

    @Output()
    sortChange: EventEmitter<DynamicTableSortConfig> = new EventEmitter();

    @Output()
    componentEvent: EventEmitter<EntityEvent> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {}

    trackByFunction(index: number, item: DynamicTableRowData) {
        return item ? item.id : undefined;
    }

    onSortClicked(e: Event, column: DynamicTableColumn) {
        e.preventDefault();
        let order = column.initialOrder || DynamicTableSortOrder.ASC;

        if (this.sort && this.sort.path === column.sortPath) {
            order =
                this.sort.order === DynamicTableSortOrder.ASC
                    ? DynamicTableSortOrder.DESC
                    : DynamicTableSortOrder.ASC;
        }

        this.sortChange.emit({
            path: column.sortPath,
            order
        });
    }

    onComponentEvent(id: string, event?: any) {
        this.componentEvent.emit({
            id,
            event
        });
    }
}

export interface EntityEvent {
    id: string;
    event: {
        type: string;
        payload?: any;
    };
}
