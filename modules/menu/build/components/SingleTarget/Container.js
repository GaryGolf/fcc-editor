"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var DragDropContextProvider = require('react-dnd').DragDropContextProvider;
var HTML5Backend = require('react-dnd-html5-backend');
var Dustbin_1 = require("./Dustbin");
var Box_1 = require("./Box");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.render = function () {
        return (React.createElement(DragDropContextProvider, { backend: HTML5Backend },
            React.createElement("div", null,
                React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } },
                    React.createElement(Dustbin_1.default, null)),
                React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } },
                    React.createElement(Box_1.default, { name: "Glass" }),
                    React.createElement(Box_1.default, { name: "Banana" }),
                    React.createElement(Box_1.default, { name: "Paper" })))));
    };
    return Container;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;
//# sourceMappingURL=Container.js.map