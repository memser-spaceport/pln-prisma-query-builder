"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_query_builder_1 = require("../../prisma-query-builder");
const defaults_1 = require("../../profile/defaults");
describe('Order Option', () => {
    let prismaQueryBuilder;
    let profile;
    let prismaModelFields;
    const TEST_EXISTING_FIELD = 'name';
    const TEST_OPTION_KEY = 'orderBy';
    const TEST_DEFAULT_ORDER = 'asc';
    const TEST_DESCENDING_ORDER = 'desc';
    describe('when being instantiated with the default profile ', () => {
        beforeEach(() => {
            profile = defaults_1.ENABLED_PROFILE;
            prismaModelFields = {
                [TEST_EXISTING_FIELD]: true,
                otherExistingField: true,
                nestedField: {
                    [TEST_EXISTING_FIELD]: true,
                },
            };
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        describe('and without its corresponding option', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    foo: 'bar',
                });
                const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSortingInQuery).toBeFalsy();
            });
        });
        describe('and with an invalid field type', () => {
            it('should exclude it from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    [TEST_OPTION_KEY]: { unexistingField: 'otherField' },
                });
                const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSortingInQuery).toBeFalsy();
            });
        });
        describe('and with a unexisting field', () => {
            it('should exclude it from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    [TEST_OPTION_KEY]: 'unexistingField',
                });
                const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSortingInQuery).toBeFalsy();
            });
        });
        describe('and with a unexisting nested field', () => {
            it('should exclude it from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    [TEST_OPTION_KEY]: `${TEST_EXISTING_FIELD}.unexistingNestedField`,
                });
                const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSortingInQuery).toBeFalsy();
            });
        });
        describe('and with a existing field', () => {
            describe('and without any explicit order specified', () => {
                it('should include it in the Prisma query with an ascending criteria', () => {
                    var _a;
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: TEST_EXISTING_FIELD,
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeTruthy();
                    const sortingQueryField = ((_a = prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) === null || _a === void 0 ? void 0 : _a[0]) || {};
                    // @ts-ignore
                    expect(sortingQueryField[TEST_EXISTING_FIELD]).toBe(TEST_DEFAULT_ORDER);
                });
            });
            describe("and that field isn't sortable", () => {
                it('should exclude it from the Prisma query', () => {
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: 'nestedField',
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeFalsy();
                });
            });
            describe('and with a descending order specified', () => {
                it('should include it in the Prisma query with an descending criteria', () => {
                    var _a;
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: `-${TEST_EXISTING_FIELD}`,
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeTruthy();
                    const sortingQueryField = ((_a = prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) === null || _a === void 0 ? void 0 : _a[0]) || {};
                    // @ts-ignore
                    expect(sortingQueryField[TEST_EXISTING_FIELD]).toBe(TEST_DESCENDING_ORDER);
                });
            });
        });
        describe('and with multiple fields', () => {
            describe("and some don't exist", () => {
                it('should exclude them from the Prisma query', () => {
                    var _a;
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: `unexisting,${TEST_EXISTING_FIELD},missing`,
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeTruthy();
                    const hasOnlyValidFields = ((prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) || []).length === 1;
                    expect(hasOnlyValidFields).toBeTruthy();
                    const sortingQueryField = ((_a = prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) === null || _a === void 0 ? void 0 : _a[0]) || {};
                    // @ts-ignore
                    expect(sortingQueryField[TEST_EXISTING_FIELD]).toBe(TEST_DEFAULT_ORDER);
                });
            });
            describe('and some are repeated', () => {
                it('should account only the first ocurrence for the Prisma query', () => {
                    var _a;
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: `${TEST_EXISTING_FIELD},-${TEST_EXISTING_FIELD}`,
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeTruthy();
                    const hasOnlyUniqueFields = ((prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) || []).length === 1;
                    expect(hasOnlyUniqueFields).toBeTruthy();
                    const sortingQueryField = ((_a = prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) === null || _a === void 0 ? void 0 : _a[0]) || {};
                    // @ts-ignore
                    expect(sortingQueryField[TEST_EXISTING_FIELD]).toBe(TEST_DEFAULT_ORDER);
                });
            });
            describe('and all exist', () => {
                it('should include them in the Prisma query', () => {
                    var _a;
                    const prismaQuery = prismaQueryBuilder.build({
                        [TEST_OPTION_KEY]: `${TEST_EXISTING_FIELD},-${TEST_EXISTING_FIELD}`,
                    });
                    const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
                    expect(hasSortingInQuery).toBeTruthy();
                    const hasOnlyUniqueFields = ((prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) || []).length === 1;
                    expect(hasOnlyUniqueFields).toBeTruthy();
                    const sortingQueryField = ((_a = prismaQuery === null || prismaQuery === void 0 ? void 0 : prismaQuery[TEST_OPTION_KEY]) === null || _a === void 0 ? void 0 : _a[0]) || {};
                    // @ts-ignore
                    expect(sortingQueryField[TEST_EXISTING_FIELD]).toBe(TEST_DEFAULT_ORDER);
                });
            });
        });
    });
    describe('when being instantiated with sorting disabled', () => {
        beforeEach(() => {
            profile = defaults_1.DISABLED_PROFILE;
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        it('should be excluded from the Prisma query', () => {
            const prismaQuery = prismaQueryBuilder.build({
                [TEST_OPTION_KEY]: TEST_EXISTING_FIELD,
            });
            const hasSortingInQuery = TEST_OPTION_KEY in prismaQuery;
            expect(hasSortingInQuery).toBeFalsy();
        });
    });
});
