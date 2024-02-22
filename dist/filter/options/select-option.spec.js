"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_query_builder_1 = require("../../prisma-query-builder");
const defaults_1 = require("../../profile/defaults");
describe('Select Option', () => {
    let prismaQueryBuilder;
    let profile;
    let prismaModelFields;
    const TEST_OPTION_KEY = 'select';
    describe('when being instantiated with the default (enabled) profile ', () => {
        beforeEach(() => {
            profile = defaults_1.ENABLED_PROFILE;
            prismaModelFields = {
                name: true,
                email: true,
                nested: {
                    address: true,
                },
                nestedList: {
                    title: true,
                },
            };
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        describe('and without its corresponding option', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build();
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeFalsy();
            });
        });
        describe('and with select specified with an empty value', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: '',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeFalsy();
            });
        });
        describe('and with select specified with an invalid value', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: ['name'],
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeFalsy();
            });
        });
        describe('and with select specified with an unexisting field', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'unexisting',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeFalsy();
            });
        });
        describe('and with select specified with a nested primitive field', () => {
            it('should be included in the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'nested.address',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeTruthy();
                expect(prismaQuery[TEST_OPTION_KEY]).toStrictEqual({
                    nested: { select: { address: true } },
                });
            });
        });
        describe('and with select specified with a nested list field', () => {
            it('should be included in the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'nestedList.title',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeTruthy();
                expect(prismaQuery[TEST_OPTION_KEY]).toStrictEqual({
                    nestedList: { select: { title: true } },
                });
            });
        });
        describe('and with select specified with a field using a prefix', () => {
            it('should be excluded from the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: '-name',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeFalsy();
            });
        });
        describe('and with select specified with a existing field', () => {
            it('should be included on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'name',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeTruthy();
                expect(prismaQuery[TEST_OPTION_KEY]).toStrictEqual({
                    name: true,
                });
            });
        });
        describe('and with select specified with repeated fields', () => {
            it('should account only for the first occurrences on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'name,email,name,email',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                expect(hasSelectInQuery).toBeTruthy();
                expect(prismaQuery[TEST_OPTION_KEY]).toStrictEqual({
                    name: true,
                    email: true,
                });
            });
        });
        describe('and with the same select and relations specified on a existing field', () => {
            it('should only account for the select on the Prisma query', () => {
                const prismaQuery = prismaQueryBuilder.build({
                    select: 'nestedList.title',
                    with: 'nestedList.title',
                });
                const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
                const hasIncludeInQuery = 'include' in prismaQuery;
                expect(hasSelectInQuery).toBeTruthy();
                expect(hasIncludeInQuery).toBeFalsy();
                expect(prismaQuery[TEST_OPTION_KEY]).toStrictEqual({
                    nestedList: {
                        select: {
                            title: true,
                        },
                    },
                });
            });
        });
    });
    describe('when being instantiated with select disabled', () => {
        beforeEach(() => {
            profile = defaults_1.DISABLED_PROFILE;
            prismaQueryBuilder = new prisma_query_builder_1.PrismaQueryBuilder(prismaModelFields, profile);
        });
        it('should be excluded from the Prisma query', () => {
            const prismaQuery = prismaQueryBuilder.build({
                select: 'name',
            });
            const hasSelectInQuery = TEST_OPTION_KEY in prismaQuery;
            expect(hasSelectInQuery).toBeFalsy();
        });
    });
});
