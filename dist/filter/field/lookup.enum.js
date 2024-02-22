"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupDelimiter = exports.LookupFilter = void 0;
var LookupFilter;
(function (LookupFilter) {
    LookupFilter["EXACT"] = "exact";
    LookupFilter["CONTAINS"] = "contains";
    LookupFilter["ICONTAINS"] = "icontains";
    LookupFilter["GT"] = "gt";
    LookupFilter["GTE"] = "gte";
    LookupFilter["LT"] = "lt";
    LookupFilter["LTE"] = "lte";
    LookupFilter["STARTS_WITH"] = "startswith";
    LookupFilter["ENDS_WITH"] = "endswith";
    LookupFilter["ISTARTS_WITH"] = "istartswith";
    LookupFilter["IENDS_WITH"] = "iendswith";
    LookupFilter["IN"] = "in";
    LookupFilter["WITH"] = "with";
    LookupFilter["BETWEEN"] = "between";
    LookupFilter["NOT"] = "not";
})(LookupFilter = exports.LookupFilter || (exports.LookupFilter = {}));
var LookupDelimiter;
(function (LookupDelimiter) {
    LookupDelimiter["LOOKUP_DELIMITER"] = "__";
    LookupDelimiter["RELATION_DELIMITER"] = ".";
})(LookupDelimiter = exports.LookupDelimiter || (exports.LookupDelimiter = {}));
