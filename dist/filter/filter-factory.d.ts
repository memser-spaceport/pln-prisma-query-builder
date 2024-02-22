import { PrismaQueryableFields } from '../prisma-fields';
import { PrismaQuery } from '../prisma-query';
import { QueryString } from '../query-string';
import { AbstractFilter } from './filter';
interface FilterFactoryQuery {
    query: PrismaQuery;
    key: string;
    value: QueryString[0];
    fields: PrismaQueryableFields;
}
export declare class FilterFactory {
    get(query: FilterFactoryQuery): AbstractFilter | undefined;
}
export {};
