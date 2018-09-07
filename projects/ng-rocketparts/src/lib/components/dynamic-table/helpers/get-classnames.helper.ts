import { flow, filter, join, uniq } from 'lodash/fp';

export function getClassNames(list: any[] = []): string {
    return flow(
        uniq,
        filter(Boolean),
        join(' ')
    )(list);
}
