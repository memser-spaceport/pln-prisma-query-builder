import { LookupFilter } from './lookup.enum';
interface BuildQueryFunction {
    build: (params: {
        prop: string;
        value: string;
        nullable?: boolean;
        boolean?: boolean;
        numeric?: boolean;
        fromMany?: boolean;
        hasMany?: boolean;
        isRelational?: boolean;
    }) => Record<string, any>;
}
export declare const LOOKUP_FILTER_MAP: Map<LookupFilter, BuildQueryFunction>;
export {};
