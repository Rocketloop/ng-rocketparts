/**
 * Created by Florian Reifschneider <florian@rocketloop.de>
 */

/**
 * Sort order directions
 */
import { Type } from '@angular/core';

import { DynamicTableComponentCell } from '../components/dynamic-table-component-cell/dynamic-table-component-cell.component';

export enum DynamicTableSortOrder {
    ASC,
    DESC
}

/**
 * Config for the sort order of a dynamic table
 */
export interface DynamicTableSortConfig {
    /**
     * The path the table should is sorted by
     */
    path: string;

    /**
     * The order in which the table is sorted
     */
    order: DynamicTableSortOrder;
}

/**
 * Configuration for a single column in a dynamic table
 */
export interface DynamicTableColumn {
    /**
     * The label of the column, used as the table header
     */
    label?: string;

    /**
     * Path to the data given to the decorator to be rendered in the table cell
     */
    path: string;

    /**
     * Info string that is gives an explanation about the column
     */
    info?: string;

    /**
     * The name of the decorator that should be used to decorate the column cells
     */
    decorator?: string;

    /**
     * Additional options for the decorator
     */
    decoratorOptions?: {
        [option: string]: any;

        styleHints?: string[];
    };

    /**
     * Path to the value that should be used to sort this column
     */
    sortPath?: string;

    /**
     * The order that this column is sorted by when first sorted
     */
    initialOrder?: DynamicTableSortOrder;
}

export interface DynamicTableConfig {
    /**
     * The column configurations for the table
     */
    columns: DynamicTableColumn[];

    /**
     * Whether the table includes multiple row groups
     */
    grouped?: boolean;

    /**
     * The 'column' configuration for the row group header
     */
    groupHeader?: DynamicTableColumn;

    /**
     * The sort config for the table
     */
    sort?: DynamicTableSortConfig;

    /**
     * Disable column headers (also disables column info and sorting)
     */
    noColumnHeaders?: boolean;
}

/**
 * Type signature for dynamic table decorators
 */
export type DynamicTableDecorator = (
    data: any,
    context: DynamicTableRowData,
    options: any
) => string;

/**
 * Model representing a single row in a table
 */
export interface DynamicTableRowData {
    [field: string]: any | DynamicTableRowData;
}

/**
 * Model representing a group of rows in a dynamic table
 */
export interface DynamicTableRowGroupData {
    rows: DynamicTableRowData[];
}

/**
 * Union type of all possible table data interfaces
 */
export type DynamicTableData = DynamicTableRowData | DynamicTableRowGroupData;

export type DynamicTableComponentCellType = Type<DynamicTableComponentCell>;

/* Bundles */

export interface DynamicTableBundle {
    tableConfig: DynamicTableConfig;

    tableData: DynamicTableData;
}
