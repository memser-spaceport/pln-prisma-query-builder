"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISABLED_PROFILE = void 0;
const default_config_1 = require("../default-config");
exports.DISABLED_PROFILE = {
    options: {
        pagination: {
            status: 'disabled',
            paginate: true,
            itemsPerPage: default_config_1.ITEMS_PER_PAGE,
        },
        ordering: {
            status: 'disabled',
        },
        orderingChildren: {
            status: 'disabled',
        },
        relations: {
            status: 'disabled',
        },
        select: {
            status: 'disabled',
        },
        distinct: {
            status: 'disabled',
        },
    },
    policy: 'skip',
};
