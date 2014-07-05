/*global $, jQuery, alert*/
"use strict";

var SkirmishDOM = (function () {
    var $loginForm = $('#login-form');
    function getLoginCredentials() {
        throw "Not Implemented";
    }
    return {
        getLoginCredentials: getLoginCredentials,
        $loginForm: $loginForm
    };
}());