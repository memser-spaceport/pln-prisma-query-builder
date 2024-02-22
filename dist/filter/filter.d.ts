import { PrismaQueryableFields } from '../prisma-fields';
import { PrismaQuery } from '../prisma-query';
import { LookupFilter } from './field/lookup.enum';
export declare abstract class AbstractFilter {
    readonly prop: string;
    readonly lookup: LookupFilter;
    readonly value: string;
    readonly fields: PrismaQueryableFields;
    query: PrismaQuery;
    constructor(query: PrismaQuery, prop: string, lookup: LookupFilter, value: string, fields: PrismaQueryableFields);
    abstract buildQuery(): void;
}
