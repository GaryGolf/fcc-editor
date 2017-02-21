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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var DropTarget_1 = require("react-dnd/lib/DropTarget");
var redux_1 = require("redux");
var actions_1 = require("../../actions");
var connect = require('react-redux').connect;
var style = require('./tile.css');
var boxTarget = {
    drop: function (props) {
        var cell = props.cell, menuItem = props.menuItem;
        return { cell: cell, menuItem: menuItem };
    }
};
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(props) {
        return _super.call(this, props) || this;
    }
    Tile.prototype.getCategoryNames = function () {
        var _this = this;
        var item = this.props.menuItem;
        return item.product_categories.map(function (item) {
            return _this.props.nomenclature.child_menus
                .find(function (child) { return child.id == item.id; }).name || null;
        });
    };
    Tile.prototype.render = function () {
        var _a = this.props, menuItem = _a.menuItem, canDrop = _a.canDrop, isOver = _a.isOver, connectDropTarget = _a.connectDropTarget;
        var isBusy = !!menuItem.id;
        var tileStyle = [
            style.container, 'well',
            canDrop && isOver ? style.active : null
        ].join(' ');
        var text = isBusy ? menuItem.name : '+';
        var textStyle = [
            isBusy ? style.category : style.plus
        ].join(' ');
        return connectDropTarget(React.createElement("div", { className: tileStyle, onClick: function () { return console.log('show modal'); } },
            React.createElement("div", { className: textStyle }, text)));
    };
    return Tile;
}(React.Component));
Tile = __decorate([
    connect(function (state) { return ({
        menu: state.menu,
        nomenclature: state.nomenclature
    }); }, function (dispatch) { return ({
        actions: redux_1.bindActionCreators(actions_1.default, dispatch)
    }); }),
    DropTarget_1.default('PRODUCT', boxTarget, function (connect, monitor) { return ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }); }),
    __metadata("design:paramtypes", [Object])
], Tile);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tile;
//# sourceMappingURL=Tile.js.map