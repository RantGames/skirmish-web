/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameState */
"use strict";

var SkirmishApp = (function () {
    var publik = {};


    publik.login = function () {
        var credentials = SkirmishDOM.getLoginCredentials();
        SkirmishClient.login(credentials.email, credentials.password, SkirmishDOM.hideLoginForm);
    };

    publik.sendMove = function (rawMove) {
        var unitIds;

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

        SkirmishApp.checkVictory();

    };

    publik.updatePlayerId = function (data) {
        console.log(data)
        SkirmishGameState.setCurrentPlayerId(data.player_id)
    }

    publik.joinNewGame = function () {
        SkirmishClient.joinNewGame(publik.processUpdate, function () {
            alert('Failed to join or create game.');
        });
    };

    publik.updateGameState = function () {
        SkirmishClient.pullGameState(publik.processUpdate, publik.joinNewGame);
    };

    publik.checkVictory = function () {
        var winner = SkirmishGameState.getWinner();

        if (winner) {
            alert('Winner: ' + winner + '!');
        }

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
