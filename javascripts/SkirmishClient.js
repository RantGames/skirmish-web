/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {
    var endpoints,
        publicAttributes;

    endpoints = {
        showGameState: '/game_state/show',
        newGame: '/game_state/new',
        sendMove: '/move/create',
        currentPlayerId: '/current_player_id'
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

    function sendMove(move, successCallback, errorCallback) {
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
            success: successCallback,
            error: errorCallback,
        });
    }

    function getCurrentPlayerId(storePlayerId) {
        $.getJSON(endpoints.currentPlayerId, storePlayerId);
    }

    publicAttributes = {
        pullGameState: pullGameState,
        sendMove: sendMove,
        joinNewGame: joinNewGame,
        getCurrentPlayerId: getCurrentPlayerId
    };

    return publicAttributes;
}());
