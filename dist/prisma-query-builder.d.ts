import { QueryString } from './query-string';
import { PrismaQuery } from './prisma-query';
import { ConfigProfile } from './profile/config-profile';
import { PrismaQueryableFields } from './prisma-fields';
export declare class PrismaQueryBuilder {
    private readonly profile;
    private readonly findOptions;
    private readonly filterFactory;
    private readonly filterableFields;
    constructor(filterableFields: PrismaQueryableFields, profile?: 'enabled' | 'disabled' | ConfigProfile);
    build(query?: QueryString): PrismaQuery;
}
