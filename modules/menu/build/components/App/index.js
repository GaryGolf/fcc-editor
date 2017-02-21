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
var React = require("react");
var DragDropContext_1 = require("react-dnd/lib/DragDropContext");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var Categories_1 = require("../Categories");
var Products_1 = require("../Products");
var Menu_1 = require("../Menu");
var redux_1 = require("redux");
var actions_1 = require("../../actions");
var connect = require('react-redux').connect;
var style = require('./app.css');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.componentWillMount = function () {
        this.props.actions.fetch();
    };
    App.prototype.render = function () {
        var _a = this.props, nomenclature = _a.nomenclature, category = _a.category, menu = _a.menu, actions = _a.actions;
        if (!nomenclature)
            return null;
        var products = category ? category.products : null;
        return (React.createElement("section", { className: style.container },
            React.createElement(Categories_1.default, { actions: actions, nomenclature: nomenclature }),
            React.createElement(Products_1.default, { products: products }),
            React.createElement(Menu_1.default, { menu: menu, actions: actions })));
    };
    return App;
}(React.Component));
App = __decorate([
    connect(function (state) { return ({
        nomenclature: state.nomenclature,
        category: state.category.current,
        menu: state.menu
    }); }, function (dispatch) { return ({
        actions: redux_1.bindActionCreators(actions_1.default, dispatch)
    }); }),
    DragDropContext_1.default(react_dnd_html5_backend_1.default)
], App);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=index.js.map