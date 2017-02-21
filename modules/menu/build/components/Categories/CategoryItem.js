"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var DragSource_1 = require("react-dnd/lib/DragSource");
var style = require('./category-item.css');
var boxSource = {
    beginDrag: function (props) {
        return { category: props.category };
    },
    endDrag: function (props, monitor) {
        var item = monitor.getItem();
        var dropResult = monitor.getDropResult();
        if (!dropResult)
            return;
        console.log("dropped " + item.category.name + " into cell # " + dropResult.cell);
        var cell = dropResult.cell, menuItem = dropResult.menuItem;
        var _a = item.category, id = _a.id, color = _a.color, icon = _a.icon, name = _a.name, products = _a.products;
        if (!!menuItem.id) {
            console.log(menuItem.name);
            var product_categories_1 = menuItem.product_categories;
            if (product_categories_1.indexOf(id) >= 0)
                return;
            var category_1 = __assign({}, menuItem, { product_categories: product_categories_1.concat([id]) });
            props.actions.dropCategory(category_1);
            return;
        }
        var product_categories = [item.category.id];
        var category = { id: id, color: color, icon: icon, name: name, cell: cell, products: products, product_categories: product_categories };
        props.actions.dropCategory(category);
    }
};
var CategoryItem = (function (_super) {
    __extends(CategoryItem, _super);
    function CategoryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CategoryItem.prototype.render = function () {
        var _a = this.props, category = _a.category, actions = _a.actions, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource;
        return connectDragSource(React.createElement("div", { className: style.container, onClick: function () { return actions.select(category); } }, category.name));
    };
    return CategoryItem;
}(React.Component));
CategoryItem = __decorate([
    DragSource_1.default('PRODUCT', boxSource, function (connect, monitor) { return ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }); })
], CategoryItem);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CategoryItem;
//# sourceMappingURL=CategoryItem.js.map