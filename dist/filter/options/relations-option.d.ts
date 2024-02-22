import { ConfigProfile } from '../../profile/config-profile';
import { BaseOption, FilterOption, FilterOptionQuery } from './filter-option';
export declare class RelationsOption extends BaseOption implements FilterOption {
    private paramKey;
    private queryKey;
    private additionalQueryKey;
    setOption(query: FilterOptionQuery, profile: ConfigProfile): void;
    isAuthorized(profile: ConfigProfile): boolean;
}
