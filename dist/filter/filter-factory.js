"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterFactory = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const field_filter_1 = require("./field/field-filter");
const lookup_enum_1 = require("./field/lookup.enum");
class FilterFactory {
    get(query) {
        if (!query.value || !(0, isString_1.default)(query.value)) {
            return;
        }
        const prop = query.key.split(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)[0];
        const notOperator = query.key.includes(`${lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER}${lookup_enum_1.LookupFilter.NOT}`);
        const lookup = query.key.includes(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)
            ? query.key.split(lookup_enum_1.LookupDelimiter.LOOKUP_DELIMITER)[notOperator ? 2 : 1]
            : lookup_enum_1.LookupFilter.EXACT;
        return new field_filter_1.FieldFilter({
            query: query.query,
            prop,
            lookup,
            value: String(query.value),
            notOperator,
            fields: query.fields,
        });
    }
}
exports.FilterFactory = FilterFactory;
