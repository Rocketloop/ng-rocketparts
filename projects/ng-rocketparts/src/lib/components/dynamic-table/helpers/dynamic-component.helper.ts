import { InjectionToken, Type } from '@angular/core';

export const ComponentRegistries = {
    TABLE_CELL: 'table-cell'
};

export interface DynamicComponentInjectionTokenMap {
    [componentType: string]: InjectionToken<Type<any>>;
}

export const injectionTokenMap: {
    [registry: string]: DynamicComponentInjectionTokenMap;
} = {};

/**
 * Register an InjectionToken for the given component type
 * @param registry
 * @param componentType
 * @param token
 */
export function registerInjectionTokenForComponentType<T>(
    registry: string,
    componentType: string,
    token: InjectionToken<Type<T>>
) {
    if (!injectionTokenMap[registry]) {
        injectionTokenMap[registry] = {};
    }
    injectionTokenMap[registry][componentType] = token;
}

/**
 * Get an InjectionToken for the given component type
 * @param registry
 * @param componentType
 * @returns
 */
export function getInjectionTokenForComponentType<T>(
    registry: string,
    componentType: string
): InjectionToken<Type<T>> {
    return injectionTokenMap[registry]
        ? injectionTokenMap[registry][componentType]
        : undefined;
}
