"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOption = void 0;
const set_1 = __importDefault(require("lodash/set"));
const uniqBy_1 = __importDefault(require("lodash/uniqBy"));
const filter_option_1 = require("./filter-option");
/**
 * Sorting:
 * https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#sorting
 */
class OrderOption extends filter_option_1.BaseOption {
    constructor() {
        super(...arguments);
        this.queryKey = 'orderBy';
    }
    setOption(query, profile) {
        this.excludeInvalidQueryFields(query, this.queryKey, {
            ignorePrefix: '-',
            allowNested: true,
            onlyPrimitiveFields: true,
        });
        if (!this.isAuthorized(profile)) {
            delete query.source[this.queryKey];
            return;
        }
        if (!query.source[this.queryKey]) {
            return;
        }
        // Initialize sorting rules:
        query.target[this.queryKey] = [];
        // Grab order fields into unique list:
        const uniqueFields = (0, uniqBy_1.default)(String(query.source[this.queryKey]).split(','), (field) => field.replace('-', ''));
        for (const field of uniqueFields) {
            const orderCriteria = this.getOrderCriteria(field);
            const orderField = orderCriteria === 'asc' ? field : field.substr(1, field.length);
            const fieldQuery = field.includes('.')
                ? (0, set_1.default)({}, orderField, orderCriteria)
                : { [orderField]: orderCriteria };
            query.target[this.queryKey].push(fieldQuery);
        }
        delete query.source[this.queryKey];
    }
    getOrderCriteria(field) {
        if (field.startsWith('-')) {
            return 'desc';
        }
        return 'asc';
    }
    isAuthorized(profile) {
        return profile.options.ordering.status !== 'disabled';
    }
}
exports.OrderOption = OrderOption;
