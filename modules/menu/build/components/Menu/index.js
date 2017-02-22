"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Tile_1 = require("./Tile");
var CONST = require("../../constants");
var style = require('./menu.css');
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu(props) {
        var _this = _super.call(this, props) || this;
        _this.menuPrototype = {
            id: '',
            icon: '',
            name: '',
            color: '',
            cell: null,
            products: [],
            product_categories: []
        };
        _this.menu = Array(CONST.MENU_LENGTH).fill(_this.menuPrototype);
        return _this;
    }
    Menu.prototype.render = function () {
        var _a = this.props, menu = _a.menu, actions = _a.actions;
        var items = this.menu.map(function (item, idx) {
            var menuItem = menu.find(function (item) { return item.cell == idx; }) || item;
            return React.createElement(Tile_1.default, { key: idx, cell: idx, menuItem: menuItem });
        });
        return (React.createElement("section", { className: style.container }, items));
    };
    return Menu;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
//# sourceMappingURL=index.js.map