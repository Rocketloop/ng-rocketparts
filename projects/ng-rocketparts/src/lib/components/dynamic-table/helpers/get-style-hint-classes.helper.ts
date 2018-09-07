import { map } from 'lodash/fp';

const _makeClassName = (prefix: string, hint: string | number) =>
    `${prefix}-${hint}`;

export function getStyleHintClasses(
    prefix: string,
    stylehints: string[] = []
): string[] {
    return map(hint => _makeClassName(prefix, hint))(stylehints);
}
