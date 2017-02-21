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
var DropTarget_1 = require("react-dnd/lib/DropTarget");
var style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
var dustbinTarget = {
    drop: function (props, monitor) { props.onDrop(monitor.getItem()); }
};
var Dustbin = (function (_super) {
    __extends(Dustbin, _super);
    function Dustbin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dustbin.prototype.render = function () {
        var _a = this.props, accepts = _a.accepts, isOver = _a.isOver, canDrop = _a.canDrop, connectDropTarget = _a.connectDropTarget, lastDroppedItem = _a.lastDroppedItem;
        var isActive = isOver && canDrop;
        var backgroundColor = '#222';
        if (isActive) {
            backgroundColor = 'darkgreen';
        }
        else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }
        return connectDropTarget(React.createElement("div", { style: __assign({}, style, { backgroundColor: backgroundColor }) },
            isActive ? 'Release to drop' : "This dustbin accepts: " + accepts.join(', '),
            lastDroppedItem && React.createElement("p", null,
                "Last dropped: ",
                JSON.stringify(lastDroppedItem))));
    };
    return Dustbin;
}(React.Component));
Dustbin.propTypes = {
    connectDropTarget: React.PropTypes.func.isRequired,
    isOver: React.PropTypes.bool.isRequired,
    canDrop: React.PropTypes.bool.isRequired,
    accepts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    lastDroppedItem: React.PropTypes.object,
    onDrop: React.PropTypes.func.isRequired,
};
Dustbin = __decorate([
    DropTarget_1.default(function (props) { return props.accepts; }, dustbinTarget, function (connect, monitor) { return ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }); })
], Dustbin);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Dustbin;
//# sourceMappingURL=Dustbin.js.map