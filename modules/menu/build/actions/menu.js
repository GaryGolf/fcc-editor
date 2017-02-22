"use strict";
var Actions = require("./types/menu");
function load() {
}
exports.load = load;
function dropCategory(category) {
    return {
        type: Actions.DROP_CATEGORY,
        payload: category
    };
}
exports.dropCategory = dropCategory;
//# sourceMappingURL=menu.js.map