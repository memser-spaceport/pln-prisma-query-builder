"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_query_builder_1 = require("../../prisma-query-builder");
const defaults_1 = require("../../profile/defaults");
describe('Relations Option', () => {
    let prismaQueryBuilder;
    let profile;
    let prismaModelFields;
    const TEST_DEFAULT_QUERY_KEY = 'include';
    const TEST_ADDITIONAL_QUERY_KEY = 'select';
    describe('when being instantiated with the default (enabled) profile', () => {
        beforeEach(() => {
            profile = defaults_1.ENABLED_PROFILE;
            prismaModelFields = {
                name: true,
                email: true,
                nested: {
                    address: true,
                    roles: {
                        _many: true,
                    },
                    skills: {
                        _many: true,
                    },
                },
                nestedList: {
                    _many: true,
                    title: true,
                },
            };
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        describe('and without its corresponding option', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build();
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with an empty value', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: '',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with an invalid value', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: ['name'],
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with an unexisting field', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'unexisting',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with a direct primitive field', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'name',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with a field using a prefix', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: '-nested.address',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with relations specified with repeated fields', () => {
            it('should account only for the first occurrences on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'nested,nestedList,nested,nestedList',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeTruthy();
                expect(prismaQuery[TEST_DEFAULT_QUERY_KEY]).toStrictEqual({
                    nested: true,
                    nestedList: true,
                });
            });
        });
        describe('and with relations specified with a nested primitive field', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'nested.address',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeFalsy();
            });
        });
        describe('and with the same relations and select specified on a existing field', () => {
            it('should only account for the select on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'nestedList.title',
                    select: 'nestedList.title',
                });
                const hasInvalidRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasInvalidRelationsInQuery).toBeFalsy();
                const hasValidRelationsInQuery = TEST_ADDITIONAL_QUERY_KEY in prismaQuery;
                expect(hasValidRelationsInQuery).toBeTruthy();
                expect(prismaQuery[TEST_ADDITIONAL_QUERY_KEY]).toStrictEqual({
                    nestedList: {
                        select: {
                            title: true,
                        },
                    },
                });
            });
        });
        describe('and with the different relations and select specified on existing fields', () => {
            it('should account for both on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'nested',
                    select: 'nestedList.title',
                });
                const hasInvalidRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasInvalidRelationsInQuery).toBeFalsy();
                const hasValidRelationsInQuery = TEST_ADDITIONAL_QUERY_KEY in prismaQuery;
                expect(hasValidRelationsInQuery).toBeTruthy();
                expect(prismaQuery[TEST_ADDITIONAL_QUERY_KEY]).toStrictEqual({
                    nested: true,
                    nestedList: {
                        select: {
                            title: true,
                        },
                    },
                });
            });
        });
        describe('and with nested relations specified on existing fields', () => {
            it('should account for both on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    with: 'nested.roles,nested.skills',
                });
                const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
                expect(hasRelationsInQuery).toBeTruthy();
                expect(prismaQuery[TEST_DEFAULT_QUERY_KEY]).toStrictEqual({
                    nested: {
                        include: {
                            roles: true,
                            skills: true,
                        },
                    },
                });
            });
        });
    });
    describe('when being instantiated with relations disabled', () => {
        beforeEach(() => {
            profile = defaults_1.DISABLED_PROFILE;
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        it('should be excluded from the Prisma query', () => {
            const prismaQuery = prismaQueryBuilder.build({
                with: 'nested',
            });
            const hasRelationsInQuery = TEST_DEFAULT_QUERY_KEY in prismaQuery;
            expect(hasRelationsInQuery).toBeFalsy();
        });
    });
});
