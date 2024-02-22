"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderChildrenOption = void 0;
const merge_1 = __importDefault(require("lodash/merge"));
const set_1 = __importDefault(require("lodash/set"));
const isString_1 = __importDefault(require("lodash/isString"));
const filter_option_1 = require("./filter-option");
/**
 * Sorting:
 * https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sorting
 */
class OrderChildrenOption extends filter_option_1.BaseOption {
    constructor() {
        super(...arguments);
        this.paramKey = 'order';
        this.queryKey = 'include';
        this.additionalQueryKey = 'select';
    }
    setOption(query, profile) {
        this.excludeInvalidQueryFields(query, this.paramKey, {
            ignorePrefix: '-',
            allowNestedForLists: true,
        });
        if (!this.isAuthorized(profile)) {
            delete query.source[this.paramKey];
            return;
        }
        if (!query.source[this.paramKey] ||
            !(0, isString_1.default)(query.source[this.paramKey])) {
            return;
        }
        // Grab order fields:
        const getFirstFieldName = (fieldPath) => fieldPath.split('.')[0].replace('-', '');
        const orderFields = String(query.source[this.paramKey])
            .split(',')
            // Look only for nested fields:
            .filter((field) => field.includes('.'))
            // Filter by unique order fields:
            .filter((field, index, self) => self.some((someField) => self.length === 1 ||
            getFirstFieldName(field) !== getFirstFieldName(someField) ||
            (field !== someField && self.indexOf(someField) > index)));
        if (!orderFields.length) {
            delete query.target[this.queryKey];
            delete query.source[this.paramKey];
            return;
        }
        const availableQueryKey = this.additionalQueryKey in query.target
            ? this.additionalQueryKey
            : this.queryKey;
        for (const field of orderFields) {
            const nestedFields = field.split('.');
            const relatedField = nestedFields.shift() || '';
            const orderCriteria = this.getOrderCriteria(relatedField);
            const orderField = orderCriteria === 'asc'
                ? relatedField
                : relatedField.substring(1, relatedField.length);
            const orderQuery = {
                [orderField]: {
                    orderBy: (0, set_1.default)({}, nestedFields, orderCriteria),
                },
            };
            query.target[availableQueryKey] = {
                ...query.target[availableQueryKey],
                ...(0, merge_1.default)(query.target[availableQueryKey], orderQuery),
            };
        }
        delete query.source[this.paramKey];
    }
    getOrderCriteria(field) {
        if (field.startsWith('-')) {
            return 'desc';
        }
        return 'asc';
    }
    isAuthorized(profile) {
        return profile.options.orderingChildren.status !== 'disabled';
    }
}
exports.OrderChildrenOption = OrderChildrenOption;
