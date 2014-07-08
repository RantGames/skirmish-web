/*global $, jQuery, SkirmishApp, SkirmishDOM, SkirmishClient, Pusher */

"use strict";

var SkirmishTrigger = (function () {
    var publik = {};

    publik.registerEvents = function () {
        var pusher,
            channel;

        pusher = new Pusher('013b1cfdc9072c8dbe04');
        channel = pusher.subscribe('skirmish_channel');
        publik.registerUpdateMapEvent(channel);
        publik.registerUpdateChatEvent(channel);
        SkirmishClient.registerChatClick();
    };

    publik.registerUpdateMapEvent = function (channel) {
        channel.bind('update_state', function (data) {
            if (data.message === 'pull_game_state') {
                SkirmishApp.updateGameState();
                console.log('pulling new game state');
            }
        });
    };

    publik.registerUpdateChatEvent = function (channel) {
        channel.bind('chat_message', function (data) {
            SkirmishDOM.chat(data.message);
        });
    };

    return publik;

}());

