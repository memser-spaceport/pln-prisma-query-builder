"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistinctOption = void 0;
const filter_option_1 = require("./filter-option");
/**
 * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#distinct
 */
class DistinctOption extends filter_option_1.BaseOption {
    constructor() {
        super(...arguments);
        this.paramKey = 'distinct';
    }
    setOption(query, profile) {
        this.excludeInvalidQueryFields(query, this.paramKey);
        if (!this.isAuthorized(profile)) {
            delete query.source[this.paramKey];
            return;
        }
        if (!query.source[this.paramKey]) {
            return;
        }
        // Grab distinct fields:
        const distinctFields = String(query.source[this.paramKey]).split(',');
        // Set distinct fields:
        query.target.distinct = distinctFields;
        // Remove distinct fields from query:
        delete query.source[this.paramKey];
        // If there are no fields to distinct, remove the distinct option:
        if (query.target.distinct.length === 0) {
            delete query.target.distinct;
        }
    }
    isAuthorized(profile) {
        return profile.options.distinct.status !== 'disabled';
    }
}
exports.DistinctOption = DistinctOption;
