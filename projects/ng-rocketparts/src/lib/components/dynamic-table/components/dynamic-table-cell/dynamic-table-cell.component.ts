import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {
    AbstractDynamicCellComponent,
    getClassNames,
    getStyleHintClasses
} from '../../helpers';
import { DynamicTableDecoratorService } from '../../services/dynamic-table-decorator.service';

@Component({
    selector: '[ngrDynamicTableCell]', // tslint:disable-line:component-selector
    templateUrl: './dynamic-table-cell.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicTableCellComponent extends AbstractDynamicCellComponent
    implements OnInit, OnChanges {
    @Input()
    decorator: string;

    @Input()
    decoratorOptions: any;

    @Input()
    classPrefix = 'ngr-dynamic-table-cell';

    @HostBinding('class')
    get classNames() {
        const externalClasses = Array.from(this.el.nativeElement.classList);
        const decoratorClass = this.decorator
            ? `${this.classPrefix}--${this.decorator}`
            : '';
        const styleHints =
            (this.decoratorOptions && this.decoratorOptions.styleHints) || [];

        return getClassNames([
            ...externalClasses,
            this.classPrefix,
            decoratorClass,
            ...getStyleHintClasses(this.classPrefix, styleHints)
        ]);
    }

    @HostBinding('innerHtml')
    content: string;

    constructor(
        private decoratorService: DynamicTableDecoratorService,
        private el: ElementRef
    ) {
        super();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['decorator'] ||
            changes['decoratorOptions'] ||
            changes['data'] ||
            changes['path']
        ) {
            this._updateComponent();
        }
    }

    protected _updateComponent() {
        this.content = this.decoratorService.applyDecorator(
            this.decorator,
            this.data,
            this.path,
            this.decoratorOptions
        );
    }
}
