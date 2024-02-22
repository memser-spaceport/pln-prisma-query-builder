"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsCollection = void 0;
const distinct_option_1 = require("./distinct-option");
const order_children_option_1 = require("./order-children-option");
const order_option_1 = require("./order-option");
const pagination_option_1 = require("./pagination-option");
const relations_option_1 = require("./relations-option");
const select_option_1 = require("./select-option");
class OptionsCollection {
    constructor() {
        this.options = [
            new pagination_option_1.PaginationOption(),
            new select_option_1.SelectOption(),
            new relations_option_1.RelationsOption(),
            new order_option_1.OrderOption(),
            new order_children_option_1.OrderChildrenOption(),
            new distinct_option_1.DistinctOption(),
        ];
    }
}
exports.OptionsCollection = OptionsCollection;
