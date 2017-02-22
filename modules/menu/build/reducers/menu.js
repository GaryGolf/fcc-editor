"use strict";
var Actions = require("../actions/types/menu");
var initialState = [];
function menu(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Actions.DROP_CATEGORY:
            return state.concat([action.payload]);
        default:
            break;
    }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = menu;
//# sourceMappingURL=menu.js.map