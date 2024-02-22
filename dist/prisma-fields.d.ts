type PrismaFieldOptions = {
    _type?: 'string' | 'boolean' | 'number';
    _many?: boolean;
    _nullable?: boolean;
};
export type PrismaQueryableFields = {
    [queryField: string]: PrismaQueryableFields | PrismaFieldOptions | boolean;
};
export {};
