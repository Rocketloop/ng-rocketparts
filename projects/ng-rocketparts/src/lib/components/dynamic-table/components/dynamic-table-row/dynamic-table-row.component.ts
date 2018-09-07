import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

import {
    DynamicTableConfig,
    DynamicTableRowData
} from '../../models/dynamic-table.model';

@Component({
    selector: '[ngrDynamicTableRow]', // tslint:disable-line:component-selector
    templateUrl: './dynamic-table-row.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableRowComponent implements OnInit {
    @Input()
    config: DynamicTableConfig;

    @Input()
    data: DynamicTableRowData;

    @Input()
    selected: boolean;

    @Output()
    toggleSelection: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    componentEvent: EventEmitter<any> = new EventEmitter();

    constructor() {}

    ngOnInit() {}

    onComponentEvent(event: any) {
        this.componentEvent.next(event);
    }
}
