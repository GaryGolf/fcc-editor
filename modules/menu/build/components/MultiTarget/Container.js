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
var update = require("react/lib/update");
var DragDropContext_1 = require("react-dnd/lib/DragDropContext");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var Dustbin_1 = require("./Dustbin");
var Box_1 = require("./Box");
var ItemTypes_1 = require("./ItemTypes");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            dustbins: [
                { accepts: [ItemTypes_1.default.GLASS], lastDroppedItem: null },
                { accepts: [ItemTypes_1.default.FOOD], lastDroppedItem: null },
                { accepts: [ItemTypes_1.default.PAPER, ItemTypes_1.default.GLASS, react_dnd_html5_backend_1.NativeTypes.URL], lastDroppedItem: null },
                { accepts: [ItemTypes_1.default.PAPER, react_dnd_html5_backend_1.NativeTypes.FILE], lastDroppedItem: null },
            ],
            boxes: [
                { name: 'Bottle', type: ItemTypes_1.default.GLASS },
                { name: 'Banana', type: ItemTypes_1.default.FOOD },
                { name: 'Magazine', type: ItemTypes_1.default.PAPER },
            ],
            droppedBoxNames: [],
        };
        return _this;
    }
    Container.prototype.isDropped = function (boxName) {
        return this.state.droppedBoxNames.indexOf(boxName) > -1;
    };
    Container.prototype.handleDrop = function (index, item) {
        var name = item.name;
        this.setState(update(this.state, {
            dustbins: (_a = {},
                _a[index] = {
                    lastDroppedItem: {
                        $set: item,
                    },
                },
                _a),
            droppedBoxNames: name ? {
                $push: [name],
            } : {},
        }));
        var _a;
    };
    Container.prototype.render = function () {
        var _this = this;
        var _a = this.state, boxes = _a.boxes, dustbins = _a.dustbins;
        return (React.createElement("div", null,
            React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } }, dustbins.map(function (_a, index) {
                var accepts = _a.accepts, lastDroppedItem = _a.lastDroppedItem;
                return React.createElement(Dustbin_1.default, { accepts: accepts, lastDroppedItem: lastDroppedItem, onDrop: function (item) { return _this.handleDrop(index, item); }, key: index });
            })),
            React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } }, boxes.map(function (_a, index) {
                var name = _a.name, type = _a.type;
                return React.createElement(Box_1.default, { name: name, type: type, isDropped: _this.isDropped(name), key: index });
            }))));
    };
    return Container;
}(React.Component));
Container = __decorate([
    DragDropContext_1.default(react_dnd_html5_backend_1.default),
    __metadata("design:paramtypes", [Object])
], Container);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;
//# sourceMappingURL=Container.js.map