import { Component } from '@angular/core';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { get } from 'lodash';

import { DynamicTableSortConfig } from '../../models/dynamic-table.model';
import { AbstractDynamicCellComponent } from '../abstract-dynamic-cell.component';

const testConfig = {
    columns: [
        {
            label: 'First Name',
            path: 'firstName'
        },
        {
            label: 'Last Name',
            path: 'lastName'
        },
        {
            label: 'Phone number',
            path: 'phoneNumber'
        }
    ]
};

const testData = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567900'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        phoneNumber: '+1234567900'
    },
    {
        id: 3,
        firstName: 'Bill',
        lastName: 'Doe',
        phoneNumber: '+1234567900'
    }
];

const groupedTestConfig = {
    ...testConfig,
    grouped: true,
    groupHeader: {
        path: 'group.label'
    }
};

const decoratorTestConfigColumns = testConfig.columns.map(column => ({
    ...column,
    decorator: 'component',
    decoratorOptions: { component: 'dummy' }
}));

const decoratorTestConfig = { columns: decoratorTestConfigColumns };

const withSortTestConfigColumn = {
    label: 'First Name',
    path: 'firstName',
    sortPath: 'firstName',
    initialOrder: 'ASC'
};
const [_, ...tail] = testConfig.columns;

const withSortTestConfig = {
    columns: [withSortTestConfigColumn, ...tail]
};

@Component({
    template: `<ngr-dynamic-table
                    [config]="config$ | async"
                    [data]="data$ | async">
                </ngr-dynamic-table>`
})
export class SingleBodyDynamicTableComponent {
    data$ = of(testData);
    config$ = of(testConfig);
}

@Component({
    template: `<ngr-dynamic-table
                   [config]="config$ | async"
                   [data]="data$ | async">
                </ngr-dynamic-table>`
})
export class GroupedBodyDynamicTableComponent {
    data$: Observable<any> = of([
        {
            group: {
                label: `Doe's family`
            },
            rows: [
                {
                    id: 1,
                    firstName: 'John',
                    lastName: 'Doe',
                    phoneNumber: '+1234567900'
                },
                {
                    id: 2,
                    firstName: 'Jane',
                    lastName: 'Doe',
                    phoneNumber: '+1234567900'
                },
                {
                    id: 3,
                    firstName: 'Bill',
                    lastName: 'Doe',
                    phoneNumber: '+1234567900'
                }
            ]
        },
        {
            group: {
                label: `Johnson's family`
            },
            rows: [
                {
                    id: 4,
                    firstName: 'John',
                    lastName: 'Johnson',
                    phoneNumber: '+1234567900'
                },
                {
                    id: 5,
                    firstName: 'Jane',
                    lastName: 'Johnson',
                    phoneNumber: '+1234567900'
                },
                {
                    id: 6,
                    firstName: 'Bill',
                    lastName: 'Johnson',
                    phoneNumber: '+1234567900'
                }
            ]
        }
    ]);

    config$ = of(groupedTestConfig);
}

@Component({
    template: `<ngr-dynamic-table
                   [config]="config$ | async"
                   [data]="data$ | async">
                </ngr-dynamic-table>`
})
export class NoDataDynamicTableComponent {
    data$ = of([]);
    config$ = of(testConfig);
}

@Component({
    selector: 'ngr-dummy',
    template: `<div>{{ dummyValue }}</div>`
})
export class DummyComponent extends AbstractDynamicCellComponent {
    dummyValue;

    protected _updateComponent() {
        this.dummyValue = get(this.data, this.path);
    }
}

@Component({
    template: `<ngr-dynamic-table
                   [config]="config$ | async"
                   [data]="data$ | async">
                </ngr-dynamic-table>`
})
export class WithDummyComponent {
    config$ = of(decoratorTestConfig);
    data$ = of(testData);
}

@Component({
    template: `<ngr-dynamic-table
                    [config]="config$ | async"
                    [data]="data$ | async"
                    [sort]="currentSort$ | async"
                    (sortChange)="onSortChange($event)">
                </ngr-dynamic-table>`
})
export class WithSortEventDynamicTableComponent {
    receivedEvent = false;
    currentSort$: BehaviorSubject<DynamicTableSortConfig> = new BehaviorSubject(
        null
    );

    data$ = of(testData);
    config$ = of(withSortTestConfig);

    onSortChange($event) {
        this.receivedEvent = true;
        this.currentSort$.next($event);
    }
}
