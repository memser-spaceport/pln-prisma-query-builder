"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldFilter = void 0;
const get_1 = __importDefault(require("lodash/get"));
const has_1 = __importDefault(require("lodash/has"));
const isArray_1 = __importDefault(require("lodash/isArray"));
const isString_1 = __importDefault(require("lodash/isString"));
const mergeWith_1 = __importDefault(require("lodash/mergeWith"));
const set_1 = __importDefault(require("lodash/set"));
const filter_1 = require("../filter");
const field_filter_map_1 = require("./field-filter-map");
class FieldFilter extends filter_1.AbstractFilter {
    constructor(config) {
        super(config.query, config.prop, config.lookup, config.value, config.fields);
        this.notOperator = config.notOperator;
        const isNestedField = config.prop.includes('.');
        const parentFieldToBeQueried = isNestedField
            ? config.fields[config.prop.split('.')[0]]
            : undefined;
        const fieldToBeQueried = isNestedField
            ? (0, get_1.default)(config.fields, config.prop)
            : config.fields[config.prop];
        this.fieldToBeQueriedIsNullable =
            typeof fieldToBeQueried === 'object' &&
                (fieldToBeQueried === null || fieldToBeQueried === void 0 ? void 0 : fieldToBeQueried._nullable) === true;
        this.fieldToBeQueriedIsNumeric =
            typeof fieldToBeQueried === 'object' &&
                (fieldToBeQueried === null || fieldToBeQueried === void 0 ? void 0 : fieldToBeQueried._type) === 'number';
        this.fieldToBeQueriedIsBoolean =
            typeof fieldToBeQueried === 'object' &&
                (fieldToBeQueried === null || fieldToBeQueried === void 0 ? void 0 : fieldToBeQueried._type) === 'boolean';
        this.fieldToBeQueriedHasMany =
            typeof fieldToBeQueried === 'object' && (fieldToBeQueried === null || fieldToBeQueried === void 0 ? void 0 : fieldToBeQueried._many) === true;
        this.fieldToBeQueriedComesFromMany =
            typeof parentFieldToBeQueried === 'object' &&
                (parentFieldToBeQueried === null || parentFieldToBeQueried === void 0 ? void 0 : parentFieldToBeQueried._many) === true;
        this.fieldToBeQueriedIsRelational =
            typeof fieldToBeQueried === 'object' &&
                !!Object.keys(fieldToBeQueried).filter((key) => !key.includes('_'))
                    .length;
    }
    buildQuery() {
        var _a;
        const hasUnexistingField = !(0, has_1.default)(this.fields, this.prop);
        const hasInvalidNumericLookup = this.fieldToBeQueriedIsNumeric && isNaN(+this.value.split(',')[0]);
        const hasInvalidRelationalLookup = this.fieldToBeQueriedIsRelational && this.value !== 'null';
        if (hasUnexistingField ||
            hasInvalidNumericLookup ||
            hasInvalidRelationalLookup) {
            return;
        }
        let queryToAdd = {};
        queryToAdd = this.setQuery(queryToAdd);
        if (this.notOperator && (0, isString_1.default)(this.value)) {
            const prismaQueryPath = !this.fieldToBeQueriedComesFromMany && !this.fieldToBeQueriedHasMany
                ? this.prop
                : this.prop
                    .replace(/\./g, '.some.')
                    .replace(/(?<last>\.some\..*)(\.some\.)(?<field>\w+)$/, '$1.is.$3');
            const prismaQueryValue = (_a = [
                {
                    is: queryToAdd[this.prop],
                    when: this.prop in queryToAdd && !!queryToAdd[this.prop],
                },
                {
                    is: +this.value,
                    when: this.fieldToBeQueriedIsNumeric && !isNaN(+this.value),
                },
                {
                    is: null,
                    when: this.value === 'null' && this.fieldToBeQueriedIsNullable,
                },
                {
                    is: { none: {} },
                    when: this.value === 'null' && this.fieldToBeQueriedHasMany,
                },
                {
                    is: this.value === 'true',
                    when: this.fieldToBeQueriedIsBoolean,
                },
                {
                    is: this.value,
                    when: this.value !== 'null' || !this.fieldToBeQueriedIsNullable,
                },
            ].find((condition) => !!condition.when)) === null || _a === void 0 ? void 0 : _a.is;
            const hasInclusiveLookup = 'AND' in queryToAdd;
            const hasMultiValueLookup = typeof prismaQueryValue === 'string' && prismaQueryValue.includes(',');
            // Build either a "multi-value-NOT-condition"
            // (with an inclusive/exclusive nature)
            // or a "single-value-NOT-condition"
            queryToAdd = hasMultiValueLookup
                ? {
                    [hasInclusiveLookup ? 'AND' : 'OR']: prismaQueryValue
                        .split(',')
                        .map((val) => ({
                        NOT: (0, set_1.default)({}, prismaQueryPath, this.fieldToBeQueriedIsNumeric ? +val : val),
                    })),
                }
                : {
                    NOT: (0, set_1.default)({}, prismaQueryPath, prismaQueryValue),
                };
        }
        // Merge all conditions to be added:
        if (Object.keys(queryToAdd).length) {
            this.query['where'] = (0, mergeWith_1.default)(this.query['where'], queryToAdd, (objValue, srcValue) => {
                if ((0, isArray_1.default)(objValue) && (0, isArray_1.default)(srcValue)) {
                    return [...objValue, ...srcValue];
                }
            });
            // Group multiple independent NOT conditions
            // with single values inside an AND operator:
            // if (
            //   'NOT' in this.query['where'] &&
            //   Object.keys(this.query['where'].NOT).length > 1
            // ) {
            //   this.query['where'].AND = [
            //     ...(this.query['where']?.AND || []),
            //     ...Object.entries(this.query['where'].NOT).reduce(
            //       (conditions:any, condition: any) => {
            //         return [
            //           ...conditions,
            //           { NOT: Object.fromEntries(new Map([condition])) },
            //         ];
            //       },
            //       []
            //     )
            //   ] as any;
            //   delete this.query['where']['NOT'];
            // }
        }
    }
    setQuery(queryToAdd) {
        var _a;
        return (((_a = field_filter_map_1.LOOKUP_FILTER_MAP.get(this.lookup)) === null || _a === void 0 ? void 0 : _a.build({
            prop: this.prop,
            value: this.value,
            nullable: this.fieldToBeQueriedIsNullable,
            numeric: this.fieldToBeQueriedIsNumeric,
            boolean: this.fieldToBeQueriedIsBoolean,
            fromMany: this.fieldToBeQueriedComesFromMany,
            hasMany: this.fieldToBeQueriedHasMany,
            isRelational: this.fieldToBeQueriedIsRelational,
        })) || queryToAdd);
    }
}
exports.FieldFilter = FieldFilter;
