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
var style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
};
var boxSource = {
    beginDrag: function (props) {
        return {
            name: props.name,
        };
    },
};
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Box.prototype.render = function () {
        var _a = this.props, name = _a.name, isDropped = _a.isDropped, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource;
        var opacity = isDragging ? 0.4 : 1;
        return connectDragSource(React.createElement("div", { style: __assign({}, style, { opacity: opacity }) }, isDropped ? React.createElement("s", null, name) : name));
    };
    return Box;
}(React.Component));
Box.propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    isDropped: React.PropTypes.bool.isRequired,
};
Box = __decorate([
    DragSource_1.default(function (props) { return props.type; }, boxSource, function (connect, monitor) { return ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }); })
], Box);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Box;
//# sourceMappingURL=Box.js.map