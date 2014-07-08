/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {
    var endpoints,
        publicAttributes;

    endpoints = {
        showGameState: '/game_state/show',
        newGame: '/game_state/new',
        sendMove: '/move/create',
    };

    function pullGameState(successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: endpoints.showGameState,
            dataType: 'json',
            success: successCallback,
            error: errorCallback,
        });
    }

    function joinNewGame(successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: endpoints.newGame,
            dataType: 'json',
            success: successCallback,
            error: errorCallback,
        });
    }

    function sendMove(move) {
        var serverFormattedMove = {
            move: {
                action: move.action,
                origin_ids: move.originIds,
                target_id: move.targetId,
            },
            game_id: move.gameId,
        };

        $.ajax({
            url: endpoints.sendMove,
            data: JSON.stringify(serverFormattedMove),
            type: 'POST',
            contentType: 'application/json',
            dataType:  'json',
        });
    }

    publicAttributes = {
        pullGameState: pullGameState,
        sendMove: sendMove,
        joinNewGame: joinNewGame,
    };

    return publicAttributes;
}());