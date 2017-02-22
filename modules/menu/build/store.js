"use strict";
var redux_1 = require("redux");
var createLogger = require("redux-logger");
var redux_thunk_1 = require("redux-thunk");
var react_router_redux_1 = require("react-router-redux");
var reducers_1 = require("./reducers");
function configureStore(history, initialState) {
    var create = window.devToolsExtension && !PRODUCTION
        ? window.devToolsExtension()(redux_1.createStore)
        : redux_1.createStore;
    var middleware = [redux_thunk_1.default, react_router_redux_1.routerMiddleware(history)];
    if (!PRODUCTION)
        middleware.push(createLogger({ collapsed: true }));
    var createStoreWithMiddleware = redux_1.applyMiddleware.apply(void 0, middleware)(create);
    var store = createStoreWithMiddleware(reducers_1.default, initialState);
    if (!PRODUCTION && module.hot) {
        module.hot.accept('./reducers', function () {
            store.replaceReducer(require('./reducers'));
        });
    }
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
//# sourceMappingURL=store.js.map