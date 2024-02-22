"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENABLED_RETRIEVAL_PROFILE = exports.ENABLED_PROFILE = void 0;
const default_config_1 = require("../default-config");
exports.ENABLED_PROFILE = {
    options: {
        pagination: {
            status: 'enabled',
            paginate: true,
            itemsPerPage: default_config_1.ITEMS_PER_PAGE,
        },
        ordering: {
            status: 'enabled',
        },
        orderingChildren: {
            status: 'enabled',
        },
        relations: {
            status: 'enabled',
        },
        select: {
            status: 'enabled',
        },
        distinct: {
            status: 'enabled',
        },
    },
    policy: 'skip',
};
exports.ENABLED_RETRIEVAL_PROFILE = {
    options: {
        pagination: {
            status: 'disabled',
            paginate: false,
            itemsPerPage: default_config_1.ITEMS_PER_PAGE,
        },
        ordering: {
            status: 'disabled',
        },
        orderingChildren: {
            status: 'enabled',
        },
        relations: {
            status: 'enabled',
        },
        select: {
            status: 'enabled',
        },
        distinct: {
            status: 'enabled',
        },
    },
    policy: 'skip',
};
