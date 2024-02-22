import { ConfigProfile } from '../../profile/config-profile';
import { BaseOption, FilterOption } from './filter-option';
/**
 * Sorting:
 * https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sorting
 */
export declare class OrderOption extends BaseOption implements FilterOption {
    private queryKey;
    setOption(query: any, profile: ConfigProfile): void;
    private getOrderCriteria;
    isAuthorized(profile: ConfigProfile): boolean;
}
