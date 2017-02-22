"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var CategoryItem_1 = require("./CategoryItem");
var style = require('./categories.css');
var Categories = (function (_super) {
    __extends(Categories, _super);
    function Categories(props) {
        return _super.call(this, props) || this;
    }
    Categories.prototype.render = function () {
        var _a = this.props, nomenclature = _a.nomenclature, actions = _a.actions;
        var items = nomenclature.child_menus.map(function (item) { return (React.createElement(CategoryItem_1.default, { key: item.id, category: item, actions: actions })); });
        return (React.createElement("section", { className: style.container },
            React.createElement("div", { className: style.scrollable }, items)));
    };
    return Categories;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Categories;
//# sourceMappingURL=index.js.map