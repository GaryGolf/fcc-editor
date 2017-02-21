"use strict";
var Actions = require("./types/nomenclature");
var CONST = require("../constants");
exports.fetch = function () {
    var root = 'c03cb760-1575-4858-ab41-52da066b9cd5';
    var menu_id = '647ea788-3b78-4ef3-a885-d0eb1fc18a35';
    var url = CONST.menu_view_url + menu_id;
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Tenant-Domain': 'google',
            'Access-Token': 'infinity_access_token_google'
        }
    };
    return function (dispatch) { return dispatch({
        type: Actions.FETCH_NOMENCLATURE_PENDING,
        payload: window['fetch'](url, options)
            .then(function (response) { return response.json(); })
            .then(function (nomenclature) { return dispatch({
            type: Actions.FETCH_NOMENCLATURE_FULFILLED,
            payload: nomenclature
        }); })
            .catch(function (error) { return dispatch({
            type: Actions.FETCH_NOMENCLATURE_REJECTED,
            payload: error
        }); })
    }); };
};
//# sourceMappingURL=nomenclature.js.map