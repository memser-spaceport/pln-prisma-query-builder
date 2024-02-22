"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractFilter = void 0;
class AbstractFilter {
    constructor(query, prop, lookup, value, fields) {
        this.query = query;
        this.prop = prop;
        this.lookup = lookup;
        this.value = value;
        this.fields = fields;
    }
}
exports.AbstractFilter = AbstractFilter;
