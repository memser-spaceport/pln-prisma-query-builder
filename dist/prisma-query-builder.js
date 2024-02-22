"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQueryBuilder = void 0;
const filter_factory_1 = require("./filter/filter-factory");
const container_1 = require("./filter/options/container");
const loader_1 = require("./profile/loader");
class PrismaQueryBuilder {
    constructor(filterableFields, profile) {
        this.profile = (0, loader_1.loadProfile)(profile);
        this.findOptions = new container_1.OptionsCollection();
        this.filterFactory = new filter_factory_1.FilterFactory();
        this.filterableFields = filterableFields;
    }
    build(query = {}) {
        const prismaQuery = {};
        const requestQuery = { ...query };
        for (const option of this.findOptions.options) {
            option.setOption({
                source: requestQuery,
                target: prismaQuery,
                fields: this.filterableFields,
            }, this.profile);
        }
        for (const queryItem in requestQuery) {
            const filter = this.filterFactory.get({
                query: prismaQuery,
                key: queryItem,
                value: requestQuery[queryItem],
                fields: this.filterableFields,
            });
            if (filter) {
                filter.buildQuery();
            }
        }
        return prismaQuery;
    }
}
exports.PrismaQueryBuilder = PrismaQueryBuilder;
