"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationsOption = void 0;
const isString_1 = __importDefault(require("lodash/isString"));
const set_1 = __importDefault(require("lodash/set"));
const filter_option_1 = require("./filter-option");
class RelationsOption extends filter_option_1.BaseOption {
    constructor() {
        super(...arguments);
        this.paramKey = 'with';
        this.queryKey = 'include';
        this.additionalQueryKey = 'select';
    }
    setOption(query, profile) {
        this.excludeInvalidQueryFields(query, this.paramKey, {
            allowNested: true,
            allowNestedForLists: true,
            onlyRelatedFields: true,
        });
        if (!this.isAuthorized(profile)) {
            delete query.source['with'];
            return;
        }
        if (!query.source['with'] || !(0, isString_1.default)(query.source['with'])) {
            return;
        }
        const relations = String(query.source['with']).split(',');
        const availableQueryKey = this.additionalQueryKey in query.target
            ? this.additionalQueryKey
            : this.queryKey;
        query.target[availableQueryKey] = {
            ...query.target[availableQueryKey],
            ...relations.reduce((fields, currentField) => ({
                ...fields,
                ...(currentField.includes('.')
                    ? (0, set_1.default)(fields, currentField.replace(/\./g, '.include.'), true)
                    : {
                        [currentField]: true,
                    }),
            }), {}),
        };
        delete query.source['with'];
    }
    isAuthorized(profile) {
        return profile.options.relations.status !== 'disabled';
    }
}
exports.RelationsOption = RelationsOption;
