"use strict";
var Actions = require("./types/category");
function select(category) {
    return {
        type: Actions.SELECT_CATEGORY,
        payload: category
    };
}
exports.select = select;
//# sourceMappingURL=category.js.map