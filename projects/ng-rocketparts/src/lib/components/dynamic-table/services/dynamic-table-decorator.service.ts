import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { formatDate, formatNumber, formatPercent } from '@angular/common';

import { get } from 'lodash';

import {
    DynamicTableColumn,
    DynamicTableDecorator,
    DynamicTableRowData
} from '../models/dynamic-table.model';

@Injectable()
export class DynamicTableDecoratorService {
    constructor(@Inject(LOCALE_ID) private locale: string) {}

    getDataFromPath(entity: DynamicTableRowData, path: string): any {
        return get(entity, path);
    }

    /**
     * Decorator function that only emits a string representation of data
     * @param data
     * @param context
     * @param options
     * @returns
     */
    plain(data, context: DynamicTableRowData, options): string {
        return data.toString();
    }

    /**
     * Decorator function that decorates the input as a link
     * @param data
     * @param context
     * @param options
     * @returns
     */
    link(
        data: string | { url: string; label: string },
        context: DynamicTableRowData,
        options
    ): string {
        let url, label;
        if (typeof data === 'string') {
            url = data;
            label = options.label ? options.label : data;
        } else {
            url = data.url;
            label = data.label;
        }
        return `<a href="${url}">${label}</a>`;
    }

    /**
     * Decorator function that decorates the input as a date
     * @param data
     * @param context
     * @param options
     * @returns
     */
    date(data: any, context: DynamicTableRowData, options): string {
        return formatDate(data, options.format, this.locale);
    }

    /**
     * Decorator function that decorates the input as a decimal number
     * @param data
     * @param context
     * @param options
     * @returns
     */
    decimal(data: any, context: DynamicTableRowData, options): string {
        return formatNumber(data, this.locale, options.format);
    }

    /**
     * Decorator function that decorates the input as a percentage
     * @param data
     * @param context
     * @param options
     * @returns
     */
    percent(data: any, context: DynamicTableRowData, options): string {
        return formatPercent(data, this.locale, options.format);
    }

    /**
     * Decorator function that decorates the input as a currency value
     * @param data
     * @param context
     * @param options
     * @returns
     */
    currency(data: number, context: DynamicTableRowData, options): string {
        const currency = this.getDataFromPath(context, options.currencyPath);
        return `${this.decimal(data, context, options)}&nbsp;${currency}`;
    }

    /**
     * Decorator function that decorates the input as one of two specified availableValues (truthy and falsy)
     * @param data
     * @param context
     * @param options
     * @returns
     */
    boolean(data: boolean, context: DynamicTableRowData, options): string {
        return data ? options.truthy : options.falsy;
    }

    /**
     * Decorator function that decorates the input with the specified decorator and the additional information given
     * @param data
     * @param context
     * @param options
     * @returns
     */
    composite(
        data: any,
        context: DynamicTableRowData,
        options: {
            lines: DynamicTableColumn[];
            horizontal?: boolean;
            separator: string;
        }
    ): string {
        options = { lines: [], separator: '', ...options };
        const lines = options.lines.map(
            ({
                path,
                decorator = 'plain',
                decoratorOptions = { styleHints: [] }
            }) => {
                const lineData = this.getDataFromPath(context, path);
                const decoratedLine = this[decorator].bind(this)(
                    lineData,
                    context,
                    decoratorOptions
                );

                const classNames = decoratorOptions.styleHints.join(' ');

                // prettier-ignore
                return options.horizontal
                        ? `<span class="${classNames}">${decoratedLine}</span>`
                        : `<div class="dynamic-table-cell__composite-line ${classNames}">${decoratedLine}</div>`;
            }
        );

        return (
            lines.join(options.separator) ||
            '<div class="dynamic-table-cell__composite-line">&mdash;</div>'
        );
    }

    applyDecorator(
        name: string,
        entity: DynamicTableRowData,
        path: string,
        options?: any
    ): string {
        const decorator: DynamicTableDecorator = this[name] || this.plain;
        options = options || {};

        const data = this.getDataFromPath(entity, path);

        if (name === 'composite' || !!data) {
            return decorator.bind(this)(data, entity, options);
        }

        return '&mdash;';
    }
}
