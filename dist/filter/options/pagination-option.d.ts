import { ConfigProfile } from '../../profile/config-profile';
import { FilterOption, FilterOptionQuery } from './filter-option';
/**
 * Pagination:
 * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
 */
export declare class PaginationOption implements FilterOption {
    setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
    isAuthorized(profile: ConfigProfile): boolean;
}
