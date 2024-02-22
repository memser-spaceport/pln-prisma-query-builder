import { PrismaQuery } from '../../prisma-query';
import { QueryString } from '../../query-string';
import { ConfigProfile } from '../../profile/config-profile';
import { PrismaQueryableFields } from '../../prisma-fields';
export interface FilterOptionQuery {
    source: QueryString;
    target: PrismaQuery;
    fields: PrismaQueryableFields;
}
export interface FilterOption {
    setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
    isAuthorized(profile: ConfigProfile): boolean;
}
interface FilterValueExcludeOptions {
    allowNested?: boolean;
    allowNestedForLists?: boolean;
    ignorePrefix?: string;
    onlyPrimitiveFields?: boolean;
    onlyRelatedFields?: boolean;
}
export declare abstract class BaseOption {
    protected excludeInvalidQueryFields(query: FilterOptionQuery, optionKey: string, excludeOptions?: FilterValueExcludeOptions): void;
}
export {};
