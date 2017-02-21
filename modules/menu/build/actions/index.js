"use strict";
var NomenclatureActions = require("./nomenclature");
var CategoryActions = require("./category");
var MenuActions = require("./menu");
var ActionCreator = Object.assign({}, NomenclatureActions, CategoryActions, MenuActions);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActionCreator;
//# sourceMappingURL=index.js.map