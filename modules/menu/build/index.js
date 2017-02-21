"use strict";
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var react_router_redux_1 = require("react-router-redux");
var store_1 = require("./store");
var App_1 = require("./components/App");
var store = store_1.default(react_router_1.browserHistory);
var history = react_router_redux_1.syncHistoryWithStore(react_router_1.browserHistory, store);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store, key: "provider" },
    React.createElement(react_router_1.Router, { history: history },
        React.createElement(react_router_1.Route, { path: "/", component: App_1.default }))), document.getElementById('layout'));
//# sourceMappingURL=index.js.map