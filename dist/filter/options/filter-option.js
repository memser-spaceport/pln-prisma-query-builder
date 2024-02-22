"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOption = void 0;
const get_1 = __importDefault(require("lodash/get"));
const has_1 = __importDefault(require("lodash/has"));
const unset_1 = __importDefault(require("lodash/unset"));
class BaseOption {
    excludeInvalidQueryFields(query, optionKey, excludeOptions = {
        allowNested: false,
        allowNestedForLists: false,
        onlyPrimitiveFields: false,
        onlyRelatedFields: false,
    }) {
        const optionValues = () => String(query.source[optionKey]).split(',');
        const hasJustOneField = () => optionValues().length === 1;
        const getFieldWithoutPrefix = (value) => value.replace((excludeOptions === null || excludeOptions === void 0 ? void 0 : excludeOptions.ignorePrefix) || '', '');
        const getFieldWithoutNestedValues = (value) => value
            .split(',')
            .filter((field) => !field.includes('.'))
            .join(',');
        for (const valueField of optionValues()) {
            let fieldName = getFieldWithoutPrefix(valueField);
            if (excludeOptions.allowNested !== true &&
                excludeOptions.allowNestedForLists !== true) {
                fieldName = getFieldWithoutNestedValues(fieldName);
            }
            if (excludeOptions.allowNestedForLists === true &&
                Array.isArray(query.fields[fieldName.split('.')[0]])) {
                fieldName = fieldName.replace(/\./g, '[0].');
            }
            if ((0, has_1.default)(query.fields, fieldName) &&
                (excludeOptions.onlyPrimitiveFields !== true ||
                    typeof (0, get_1.default)(query.fields, fieldName) === 'boolean' ||
                    (0, has_1.default)(query.fields, `${fieldName}._type`)) &&
                (excludeOptions.onlyRelatedFields !== true ||
                    (typeof (0, get_1.default)(query.fields, fieldName) !== 'boolean' &&
                        !(0, has_1.default)(query.fields, `${fieldName}._type`)))) {
                continue;
            }
            if (hasJustOneField()) {
                (0, unset_1.default)(query.source, optionKey);
                break;
            }
            query.source[optionKey] = String(query.source[optionKey])
                .split(',')
                .filter((field) => field !== valueField)
                .join(',');
        }
    }
}
exports.BaseOption = BaseOption;
