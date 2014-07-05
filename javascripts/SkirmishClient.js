/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {
    var endpoints,
        publicAttributes;

    endpoints = {
        login: '/users/sign_in'
    };

    function login(email, password, successCallback, failureCallback) {
        var credentials = {
            user: {
                email: email,
                password: password,
                remember_me: '0'
            }
        };

        $.ajax({
            url: endpoints.login,
            data: JSON.stringify(credentials),
            type: 'POST',
            contentType: 'application/json',
            dataType:  'json',
            success: successCallback,
            error: failureCallback
        });
    }

    publicAttributes = {
        login: login
    };

    return publicAttributes;
}());