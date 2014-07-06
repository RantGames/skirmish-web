/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {
    var endpoints,
        publicAttributes;

    endpoints = {
        login: '/users/sign_in',
        show_game_state: '/game_state/show'
    };

    function login(email, password, successCallback, errorCallback) {
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
            error: errorCallback
        });
    }

    function pullGameState(successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: endpoints.show_game_state,
            dataType: 'json',
            success: successCallback,
            error: errorCallback,
        });
    }

    function sendMove(move) {
        throw 'SkirmishClient#sendMove not implemented';
    }

    publicAttributes = {
        login: login,
        pullGameState: pullGameState,
        sendMove: sendMove,
    };

    return publicAttributes;
}());