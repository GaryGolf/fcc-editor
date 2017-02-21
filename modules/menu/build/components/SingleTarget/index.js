"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Container_1 = require("./Container");
var DustbinSingleTarget = (function (_super) {
    __extends(DustbinSingleTarget, _super);
    function DustbinSingleTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DustbinSingleTarget.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("b", null,
                    React.createElement("a", { href: "https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Single%20Target" }, "Browse the Source"))),
            React.createElement("p", null, "This is the simplest example there is."),
            React.createElement("p", null, "Drag the boxes below and drop them into the dustbin." + " " + "Note that it has a neutral, an active and a hovered state." + " " + "The dragged item itself changes opacity while dragged."),
            React.createElement(Container_1.default, null)));
    };
    return DustbinSingleTarget;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DustbinSingleTarget;
//# sourceMappingURL=index.js.map