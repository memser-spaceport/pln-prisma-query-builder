"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOOKUP_FILTER_MAP = void 0;
const set_1 = __importDefault(require("lodash/set"));
const lookup_enum_1 = require("./lookup.enum");
exports.LOOKUP_FILTER_MAP = new Map([
    [
        lookup_enum_1.LookupFilter.EXACT,
        {
            build: ({ prop, value, nullable, numeric, boolean, fromMany, hasMany, isRelational, }) => {
                var _a;
                const prismaQueryPath = !fromMany && !hasMany
                    ? prop
                    : prop
                        .replace(/\./g, '.some.')
                        .replace(/(?<last>\.some\..*)(\.some\.)(?<field>\w+)$/, '$1.is.$3');
                const prismaQueryValue = (_a = [
                    {
                        is: +value,
                        when: numeric && !isNaN(+value),
                    },
                    {
                        is: value === 'true',
                        when: boolean,
                    },
                    {
                        is: { none: {} },
                        when: value === 'null' && hasMany && !fromMany,
                    },
                    {
                        is: null,
                        when: value === 'null' && (isRelational || nullable) && !hasMany,
                    },
                    {
                        is: value,
                        when: !isRelational,
                    },
                ].find((condition) => !!condition.when)) === null || _a === void 0 ? void 0 : _a.is;
                return (0, set_1.default)({}, prismaQueryPath, prismaQueryValue);
            },
        },
    ],
    [
        lookup_enum_1.LookupFilter.CONTAINS,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                contains: value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.STARTS_WITH,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                startsWith: value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.ENDS_WITH,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                endsWith: value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.ICONTAINS,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                contains: value,
                mode: 'insensitive',
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.ISTARTS_WITH,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                startsWith: value,
                mode: 'insensitive',
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.IENDS_WITH,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                endsWith: value,
                mode: 'insensitive',
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.LT,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                lt: !isNaN(+value) ? +value : value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.LTE,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                lte: !isNaN(+value) ? +value : value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.GT,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                gt: !isNaN(+value) ? +value : value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.GTE,
        {
            build: ({ prop, value, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                gte: !isNaN(+value) ? +value : value,
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.IN,
        {
            build: ({ prop, value, numeric, fromMany }) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                has: numeric
                    ? value.split(',').map((val) => +val)
                    : value.split(','),
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.WITH,
        {
            build: ({ prop, value, numeric, fromMany }) => ({
                AND: value
                    .split(',')
                    .map((val) => (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), numeric ? +val : val)),
            }),
        },
    ],
    [
        lookup_enum_1.LookupFilter.BETWEEN,
        {
            build: ({ prop, value, fromMany }) => {
                const rangeValues = value.split(',').sort();
                const lowestValue = !isNaN(+rangeValues[0])
                    ? +rangeValues[0]
                    : rangeValues[0];
                const highestValue = !isNaN(+rangeValues[1])
                    ? +rangeValues[1]
                    : rangeValues[1];
                return !!rangeValues.length
                    ? (0, set_1.default)({}, !fromMany ? prop : prop.replace(/\./g, '.some.'), {
                        gte: lowestValue,
                        lte: highestValue,
                    })
                    : {};
            },
        },
    ],
]);
