"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ProductItem_1 = require("./ProductItem");
var style = require('./products.css');
var Products = (function (_super) {
    __extends(Products, _super);
    function Products(props) {
        return _super.call(this, props) || this;
    }
    Products.prototype.render = function () {
        var products = this.props.products;
        if (!products)
            return null;
        var items = products.map(function (item, idx) { return (React.createElement(ProductItem_1.default, { key: item.description + " " + idx, name: item.description })); });
        return (React.createElement("section", { className: style.container },
            React.createElement("div", { className: style.scrollable }, items)));
    };
    return Products;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Products;
//# sourceMappingURL=index.js.map