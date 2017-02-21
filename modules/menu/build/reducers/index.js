"use strict";
var redux_1 = require("redux");
var react_router_redux_1 = require("react-router-redux");
var nomenclature_1 = require("./nomenclature");
var category_1 = require("./category");
var menu_1 = require("./menu");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers({
    routing: react_router_redux_1.routerReducer,
    nomenclature: nomenclature_1.default,
    category: category_1.default,
    menu: menu_1.default
});
//# sourceMappingURL=index.js.map