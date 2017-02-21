"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var DragSource_1 = require("react-dnd/lib/DragSource");
var style = require('./product-item.css');
var boxSource = {
    beginDrag: function (props) {
        return { name: props.name };
    },
    endDrag: function (props, monitor) {
        var item = monitor.getItem();
        var dropResult = monitor.getDropResult();
        if (dropResult) {
            console.log("You dropped " + item.name + " into cell #" + dropResult.cell + "!");
        }
    }
};
var ProductItem = (function (_super) {
    __extends(ProductItem, _super);
    function ProductItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductItem.prototype.render = function () {
        var _a = this.props, name = _a.name, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource;
        var opacity = isDragging ? 0.4 : 1;
        return connectDragSource(React.createElement("div", { className: style.container, style: { opacity: opacity } }, name));
    };
    return ProductItem;
}(React.Component));
ProductItem = __decorate([
    DragSource_1.default('PRODUCT', boxSource, function (connect, monitor) { return ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }); })
], ProductItem);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductItem;
//# sourceMappingURL=ProductItem.js.map