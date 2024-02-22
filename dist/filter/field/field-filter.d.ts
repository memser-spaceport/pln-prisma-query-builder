import { PrismaQueryableFields } from '../../prisma-fields';
import { PrismaQuery } from '../../prisma-query';
import { AbstractFilter } from '../filter';
import { LookupFilter } from './lookup.enum';
interface FilterConfig {
    query: PrismaQuery;
    prop: string;
    lookup: LookupFilter;
    value: string;
    notOperator: boolean;
    fields: PrismaQueryableFields;
}
export declare class FieldFilter extends AbstractFilter {
    private notOperator;
    private fieldToBeQueriedHasMany;
    private fieldToBeQueriedIsNullable;
    private fieldToBeQueriedIsNumeric;
    private fieldToBeQueriedIsBoolean;
    private fieldToBeQueriedIsRelational;
    private fieldToBeQueriedComesFromMany;
    constructor(config: FilterConfig);
    buildQuery(): void;
    private setQuery;
}
export {};
