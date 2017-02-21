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
var react_dom_1 = require("react-dom");
var itemTypes_1 = require("./itemTypes");
var _a = require('react-dnd'), DragSource = _a.DragSource, DropTarget = _a.DropTarget;
var style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};
var cardSource = {
    beginDrag: function (props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};
var cardTarget = {
    hover: function (props, monitor, component) {
        var dragIndex = monitor.getItem().index;
        var hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        var hoverBoundingRect = react_dom_1.findDOMNode(component).getBoundingClientRect();
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        var clientOffset = monitor.getClientOffset();
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.moveCard(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
var Card = (function (_super) {
    __extends(Card, _super);
    function Card() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Card.prototype.render = function () {
        var _a = this.props, text = _a.text, isDragging = _a.isDragging, connectDragSource = _a.connectDragSource, connectDropTarget = _a.connectDropTarget;
        var opacity = isDragging ? 0 : 1;
        return connectDragSource(connectDropTarget(React.createElement("div", { style: __assign({}, style, { opacity: opacity }) }, text)));
    };
    return Card;
}(React.Component));
Card.propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    index: React.PropTypes.number.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    id: React.PropTypes.any.isRequired,
    text: React.PropTypes.string.isRequired,
    moveCard: React.PropTypes.func.isRequired,
};
Card = __decorate([
    DropTarget(itemTypes_1.default.CARD, cardTarget, function (connect) { return ({
        connectDropTarget: connect.dropTarget(),
    }); }),
    DragSource(itemTypes_1.default.CARD, cardSource, function (connect, monitor) { return ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }); })
], Card);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Card;
//# sourceMappingURL=Card.js.map