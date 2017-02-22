"use strict";
var Actions = require("../actions/types/nomenclature");
var initialState = {
    id: '',
    icon: '',
    color: '',
    name: '',
    lft: 0,
    rgt: 0,
    depth: 0,
    child_menus: [],
    products: []
};
function nomenclature(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case Actions.FETCH_NOMENCLATURE_PENDING:
            break;
        case Actions.FETCH_NOMENCLATURE_FULFILLED:
            return action.payload;
    }
    return state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = nomenclature;
//# sourceMappingURL=nomenclature.js.map