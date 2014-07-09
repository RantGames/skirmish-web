/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {
    var endpoints,
        publicAttributes;

    endpoints = {
        showGameState: '/game_state/show',
        newGame: '/game_state/new',
        sendMove: '/move/create',
        currentPlayerId: '/current_player_id',
        chat: '/chat'
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

    function sendChat(message) {
        $.ajax({
            type: 'POST',
            url: endpoints.chat,
            data: { chat_message: message },
            success: function(){console.log('chat sent')},
            error: function(){console.log('chat fail')}
        });
    }

    function registerChatClick() {
        $("#submit").on("click", function() {
           event.preventDefault();
           var message = $('#chat_message').val();
           sendChat(message);
       });
    };

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
                origin_id: move.originId,
                target_id: move.targetId,
                quantity: move.quantity,
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
        getCurrentPlayerId: getCurrentPlayerId,
        sendChat: sendChat,
        registerChatClick: registerChatClick
    };

    return publicAttributes;
}());
