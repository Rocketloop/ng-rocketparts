import { DynamicTableModule } from './dynamic-table.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Type, InjectionToken } from '@angular/core';
import {
    NoDataDynamicTableComponent,
    SingleBodyDynamicTableComponent,
    GroupedBodyDynamicTableComponent,
    WithDummyComponent,
    DummyComponent,
    WithSortEventDynamicTableComponent
} from './helpers/testing';
import { Provider } from '@angular/compiler/src/core';
import {
    ComponentRegistries,
    registerInjectionTokenForComponentType
} from './helpers';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('DynamicTableModule', () => {
    // Configures the dynamic table module for testing
    function configureDynamicTableModule<T>(
        component: Type<T>,
        providers: Provider[] = [],
        entryComponents = []
    ) {
        TestBed.configureTestingModule({
            imports: [DynamicTableModule],
            declarations: [component, ...entryComponents],
            providers
        }).compileComponents();

        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents
            }
        });

        return TestBed.createComponent<T>(component);
    }

    describe('data binding', () => {
        let fixture: ComponentFixture<any>;
        let table: HTMLTableElement;

        it('should render default empty message when no data provided', () => {
            fixture = configureDynamicTableModule(NoDataDynamicTableComponent);
            fixture.detectChanges();
            table = fixture.debugElement.query(By.css('.ngr-dynamic-table'))
                .nativeElement;
            const emptyMessageCell = table.querySelector(
                '.dynamic-table__empty-message'
            );

            expect(emptyMessageCell.textContent).toBe(' NO DATA TO DISPLAY ');
        });

        it('should bind data to `thead` correctly', () => {
            fixture = configureDynamicTableModule(NoDataDynamicTableComponent);
            fixture.detectChanges();
            table = fixture.debugElement.query(By.css('.ngr-dynamic-table'))
                .nativeElement;
            const tableHead = table.querySelectorAll('thead th');

            expect(tableHead[0].textContent).toEqual('First Name');
            expect(tableHead[1].textContent).toEqual('Last Name');
            expect(tableHead[2].textContent).toEqual('Phone number');
        });

        it('should render a single `tbody` element', () => {
            fixture = configureDynamicTableModule(
                SingleBodyDynamicTableComponent
            );
            fixture.detectChanges();
            table = fixture.debugElement.query(By.css('.ngr-dynamic-table'))
                .nativeElement;

            const rows = table.querySelectorAll('tbody tr');

            expect(table.querySelectorAll('tbody').length).toEqual(1);
            expect(rows.length).toEqual(3);
        });

        it('should render multiple `tbody` elements when configures as group', () => {
            fixture = configureDynamicTableModule(
                GroupedBodyDynamicTableComponent
            );
            fixture.detectChanges();
            table = fixture.debugElement.query(By.css('.ngr-dynamic-table'))
                .nativeElement;

            expect(table.querySelectorAll('tbody').length).toEqual(2);
        });

        it('should bind data to the `tbody` correctly', () => {
            fixture = configureDynamicTableModule(
                SingleBodyDynamicTableComponent
            );
            fixture.detectChanges();
            table = fixture.debugElement.query(By.css('.ngr-dynamic-table'))
                .nativeElement;

            const rows = table.querySelectorAll('tbody tr');

            const firstRowDataCells = rows[0].querySelectorAll('td');
            const secondRowDataCells = rows[1].querySelectorAll('td');
            const thirdRowDataCells = rows[2].querySelectorAll('td');

            expect(firstRowDataCells[0].textContent).toBe('John');
            expect(firstRowDataCells[1].textContent).toBe('Doe');
            expect(firstRowDataCells[2].textContent).toBe('+1234567900');

            expect(secondRowDataCells[0].textContent).toBe('Jane');
            expect(secondRowDataCells[1].textContent).toBe('Doe');
            expect(secondRowDataCells[2].textContent).toBe('+1234567900');

            expect(thirdRowDataCells[0].textContent).toBe('Bill');
            expect(thirdRowDataCells[1].textContent).toBe('Doe');
            expect(thirdRowDataCells[2].textContent).toBe('+1234567900');
        });

        it('should render with given  component decorator', () => {
            const _DUMMY_ = new InjectionToken('DYNAMIC_TABLE_CELL:DUMMY');

            registerInjectionTokenForComponentType(
                ComponentRegistries.TABLE_CELL,
                'dummy',
                _DUMMY_
            );

            fixture = configureDynamicTableModule(
                WithDummyComponent,
                [
                    {
                        provide: _DUMMY_,
                        useValue: DummyComponent
                    }
                ],
                [DummyComponent]
            );

            fixture.detectChanges();

            table = fixture.debugElement.nativeElement;
            const dummyComponents = table.querySelectorAll('ngr-dummy');
            expect(dummyComponents.length).toBeGreaterThan(0);
        });
    });

    describe('sorting', () => {
        let fixture: ComponentFixture<WithSortEventDynamicTableComponent>;
        let sortLink: HTMLAnchorElement;

        beforeEach(() => {
            fixture = configureDynamicTableModule(
                WithSortEventDynamicTableComponent
            );
            fixture.detectChanges();
            sortLink = fixture.debugElement.query(
                By.css('a.dynamic-table-header__label')
            ).nativeElement;
        });

        it('should emit sort event', () => {
            sortLink.click();

            expect(fixture.componentInstance.receivedEvent).toBeTruthy();
        });
    });
});
