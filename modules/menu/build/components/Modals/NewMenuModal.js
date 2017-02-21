"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var style = require('./new-menu.css');
var NewMenuModal = (function (_super) {
    __extends(NewMenuModal, _super);
    function NewMenuModal(props) {
        return _super.call(this, props) || this;
    }
    NewMenuModal.prototype.render = function () {
        if (!this.props.show)
            return null;
        var options = ["apple", "mango", "grapes", "melon", "strawberry"]
            .map(function (fruit) { return ({ label: fruit, value: fruit }); });
        return (React.createElement("div", { className: style.container },
            React.createElement("div", { className: style.overlay, onClick: this.props.close.bind(this) }),
            React.createElement("div", { className: "modal-dialog", role: "document" },
                React.createElement("div", { className: "modal-content" },
                    React.createElement("div", { className: "modal-header" },
                        React.createElement("button", { type: "button", onClick: this.props.close.bind(this), className: "close", "data-dismiss": "modal", "aria-label": "Close" },
                            React.createElement("span", { "aria-hidden": "true" }, "\u00D7")),
                        React.createElement("h4", { className: "modal-title" }, "\u041D\u043E\u0432\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u043C\u0435\u043D\u044E")),
                    React.createElement("div", { className: "modal-body" },
                        React.createElement("p", null, "One fine body\u2026")),
                    React.createElement("div", { className: "modal-footer" },
                        React.createElement("button", { type: "button", className: "btn btn-default", "data-dismiss": "modal", onClick: this.props.close.bind(this) }, "Close"),
                        React.createElement("button", { type: "button", className: "btn btn-primary" }, "Save changes"))))));
    };
    return NewMenuModal;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NewMenuModal;
//# sourceMappingURL=NewMenuModal.js.map