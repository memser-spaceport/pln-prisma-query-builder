import { ConfigProfile } from '../../profile/config-profile';
import { BaseOption, FilterOption, FilterOptionQuery } from './filter-option';
/**
 * Sorting:
 * https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sorting
 */
export declare class OrderChildrenOption extends BaseOption implements FilterOption {
    private paramKey;
    private queryKey;
    private additionalQueryKey;
    setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
    private getOrderCriteria;
    isAuthorized(profile: ConfigProfile): boolean;
}
