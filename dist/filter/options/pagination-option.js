"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationOption = void 0;
const isNumber_1 = __importDefault(require("lodash/isNumber"));
/**
 * Pagination:
 * https://www.prisma.io/docs/concepts/components/prisma-client/pagination
 */
class PaginationOption {
    setOption(query, profile) {
        const { itemsPerPage } = profile.options.pagination;
        if (!this.isAuthorized(profile)) {
            delete query.source['pagination'];
            delete query.source['page'];
            delete query.source['limit'];
            return;
        }
        const hasPaginationEnabled = query.source['pagination'] === undefined ||
            query.source['pagination'] === 'true';
        const hasValidPage = query.source['page'] &&
            typeof query.source['page'] === 'string' &&
            (0, isNumber_1.default)(+query.source['page']) &&
            Number(query.source['page']) > 1 &&
            Number.isInteger(+query.source['page']);
        const hasValidLimit = query.source['limit'] &&
            typeof query.source['limit'] === 'string' &&
            (0, isNumber_1.default)(+query.source['limit']) &&
            Number(query.source['limit']) > 0 &&
            Number.isInteger(+query.source['limit']);
        if (hasPaginationEnabled) {
            query.target['skip'] = hasValidPage
                ? (Number(query.source['page']) - 1) *
                    (Number(query.source['limit']) || itemsPerPage)
                : 0;
            delete query.source['page'];
            query.target['take'] = hasValidLimit
                ? Number(query.source['limit'])
                : itemsPerPage;
            delete query.source['limit'];
        }
        delete query.source['pagination'];
    }
    isAuthorized(profile) {
        return profile.options.pagination.status !== 'disabled';
    }
}
exports.PaginationOption = PaginationOption;
