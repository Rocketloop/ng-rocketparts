import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    EventEmitter,
    HostBinding,
    Injector,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChange,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import {
    AbstractDynamicCellComponent,
    ComponentRegistries,
    getInjectionTokenForComponentType,
    getStyleHintClasses,
    getClassNames
} from '../../helpers';
import { DynamicTableRowData } from '../../models/dynamic-table.model';

/**
 * Component that is used with the `component` decorator options to inject a custom component into the table cell
 */
@Component({
    selector: '[ngrDynamicTableComponentCell]', // tslint:disable-line:component-selector
    templateUrl: './dynamic-table-component-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableComponentCellComponent
    extends AbstractDynamicCellComponent
    implements OnInit, OnChanges, AfterViewInit {
    @Input()
    component: string;

    @Input()
    componentOptions: any;

    @Input()
    decoratorOptions: any = { styleHints: [] };

    @Input()
    classPrefix = 'ngr-dynamic-table-cell';

    @Output()
    event: EventEmitter<any> = new EventEmitter();

    @ViewChild('componentContainer', { read: ViewContainerRef })
    componentContainer: ViewContainerRef;

    private isViewInitialized = false;

    private componentRef: ComponentRef<DynamicTableComponentCell>;
    private componentRefChanges;

    private componentEventSubscription: Subscription;

    constructor(
        private injector: Injector,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {
        super();
    }

    @HostBinding('class')
    get classNames() {
        const styleHints =
            (this.decoratorOptions && this.decoratorOptions.styleHints) || [];

        return getClassNames([
            'dynamic-table-cell',
            'dynamic-table-cell--component',
            ...getStyleHintClasses(this.classPrefix, styleHints)
        ]);
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this._updateComponent({});
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['component']) {
            this._updateComponent(changes, true);
        } else {
            this._updateComponent(changes);
        }
    }

    private createComponentRef() {
        const injectionToken = getInjectionTokenForComponentType<
            DynamicTableComponentCell
        >(ComponentRegistries.TABLE_CELL, this.component);

        if (injectionToken) {
            const type = this.injector.get(injectionToken);
            const factory = this.componentFactoryResolver.resolveComponentFactory(
                type
            );
            this.componentRef = this.componentContainer.createComponent(
                factory
            );

            Object.assign(this.componentRef.instance, {
                ...this.componentRef.instance,
                data: this.data,
                path: this.path,
                options: this.componentOptions
            });

            this.componentRefChanges = {
                data: new SimpleChange(null, this.data, true),
                path: new SimpleChange(null, this.path, true),
                options: new SimpleChange(null, this.componentOptions, true)
            };

            this.componentRef.instance.ngOnChanges(this.componentRefChanges);
        }
    }

    private updateComponentSubscriptions() {
        if (this.componentRef) {
            if (this.componentEventSubscription) {
                this.componentEventSubscription.unsubscribe();
            }

            if (this.componentRef.instance.event) {
                this.componentEventSubscription = this.componentRef.instance.event.subscribe(
                    this.event
                );
            }
        }
    }

    /**
     * Update the injected component
     * @param changes
     * @param recreate
     */
    protected _updateComponent(changes: SimpleChanges, recreate = false) {
        this.componentRefChanges = {
            ...changes,
            options: changes.componentOptions
        };
        const shouldDestroy = this.componentRef && recreate;

        if (!this.componentRef || recreate) {
            if (shouldDestroy) {
                this.componentRef.destroy();
            }

            this.createComponentRef();
            this.updateComponentSubscriptions();
        }
    }
}

export interface DynamicTableComponentCell extends OnChanges {
    data: DynamicTableRowData;

    options: any;

    path: string;

    event?: EventEmitter<any>;
}
