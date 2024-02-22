import { ConfigProfile } from '../../profile/config-profile';
import { BaseOption, FilterOption, FilterOptionQuery } from './filter-option';
/**
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#distinct
 */
export declare class DistinctOption extends BaseOption implements FilterOption {
    private paramKey;
    setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
    isAuthorized(profile: ConfigProfile): boolean;
}
