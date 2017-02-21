"use strict";
var Actions = require("../actions/types/category");
var initialState = {
    current: null
};
function category(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Actions.SELECT_CATEGORY:
            return { current: action.payload };
    }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = category;
//# sourceMappingURL=category.js.map