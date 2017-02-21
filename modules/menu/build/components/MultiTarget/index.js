"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Container_1 = require("./Container");
var DustbinMultipleTargets = (function (_super) {
    __extends(DustbinMultipleTargets, _super);
    function DustbinMultipleTargets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DustbinMultipleTargets.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", null,
                React.createElement("b", null,
                    React.createElement("a", { href: "https://github.com/react-dnd/react-dnd/tree/master/examples/01%20Dustbin/Multiple%20Targets" }, "Browse the Source"))),
            React.createElement("p", null, "This is a slightly more interesting example."),
            React.createElement("p", null, "It demonstrates how a single drop target may accept multiple types, and how those types may be derived from props." + " " + "It also demonstrates the handling of native files and URLs (try dropping them onto the last two dustbins)."),
            React.createElement(Container_1.default, null)));
    };
    return DustbinMultipleTargets;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DustbinMultipleTargets;
//# sourceMappingURL=index.js.map