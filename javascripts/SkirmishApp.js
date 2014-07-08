/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameState */
"use strict";

var SkirmishApp = (function () {
    var publik = {};

    publik.login = function () {
        var credentials = SkirmishDOM.getLoginCredentials();
        SkirmishClient.login(credentials.email, credentials.password, SkirmishDOM.hideLoginForm);
    };

    publik.sendMove = function () {
        var rawMove,
            unitIds;

        rawMove = SkirmishDOM.getTestMove();

        unitIds = SkirmishGameState.getUnitIdsForCity({
            unitCount: rawMove.unitCount,
            city: rawMove.originId,
        });

        SkirmishClient.sendMove({
            originIds: unitIds,
            targetId: rawMove.targetId,
            action: rawMove.moveType + '_unit',
            gameId: SkirmishGameState.gameId(),
        });
    };

    publik.start = function () {
        SkirmishDOM.$loginForm.on('submit', function (e) {
            e.preventDefault();
            publik.login();
        });

        SkirmishDOM.$testMoveForm.on('submit', function (e) {
            e.preventDefault();
            publik.sendMove();
        });
    };

    publik.processUpdate = function (gameState) {
        var cities;

        SkirmishGameState.process(gameState);

        cities = SkirmishGameState.cities();

        SkirmishClient.getCurrentPlayerId(publik.updatePlayerId)

        SkirmishMap.displayCities(cities);

    };

    publik.updatePlayerId = function (data) {
        SkirmishGameState.setCurrentPlayerId(data.user_id)
    }

    publik.joinNewGame = function () {
        SkirmishClient.joinNewGame(publik.processUpdate, function () {
            alert('Failed to join or create game.');
        });
    };

    publik.updateGameState = function () {
        SkirmishClient.pullGameState(publik.processUpdate, publik.joinNewGame);
    };

    return publik;
}());


// SkimishApp
// Responsibilities
//  Control the frontend Skirmish app
//  Talk to SkirmishClient to authenticate
//  Talk to SkirmishDOM to update the client ui
//
// Public API
//  start()
//   login_form.on submit try and login()
//
//  login()
//   pull credentials from skirmishdom
//   send them to SkirmishClient.login
//   update the dom with the result
//
// updateGameState()
//  pulls game state from SkirmishClient
//  asks SkirmishGameState to process the game into workable game data
//  displays all the cities
//
//
