"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Container_1 = require("./Container");
var SortableSimple = (function (_super) {
    __extends(SortableSimple, _super);
    function SortableSimple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortableSimple.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", null,
                "It is easy to implement a sortable interface with React DnD. Just make the same component both a drag source and a drop target, and reorder the data in the ",
                React.createElement("code", null, "hover"),
                " handler."),
            React.createElement(Container_1.default, null)));
    };
    return SortableSimple;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SortableSimple;
//# sourceMappingURL=index.js.map