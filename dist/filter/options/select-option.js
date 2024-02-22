"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectOption = void 0;
const filter_option_1 = require("./filter-option");
const set_1 = __importDefault(require("lodash/set"));
class SelectOption extends filter_option_1.BaseOption {
    constructor() {
        super(...arguments);
        this.queryKey = 'select';
    }
    setOption(query, profile) {
        this.excludeInvalidQueryFields(query, this.queryKey, {
            allowNested: true,
            allowNestedForLists: true,
        });
        if (!this.isAuthorized(profile)) {
            delete query.source[this.queryKey];
            return;
        }
        if (!(this.queryKey in query.source) ||
            typeof query.source[this.queryKey] !== 'string') {
            return;
        }
        const fields = query.source[this.queryKey].split(',');
        const selectedFields = fields.reduce((fields, currentField) => ({
            ...fields,
            ...(currentField.includes('.')
                ? (0, set_1.default)(fields, currentField.replace(/\./g, '.select.'), true)
                : {
                    [currentField]: true,
                }),
        }), {});
        query.target[this.queryKey] =
            this.queryKey in query.target
                ? {
                    ...query.target[this.queryKey],
                    ...selectedFields,
                }
                : selectedFields;
        delete query.source[this.queryKey];
    }
    isAuthorized(profile) {
        return profile.options.select.status !== 'disabled';
    }
}
exports.SelectOption = SelectOption;
