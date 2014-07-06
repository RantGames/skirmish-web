/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameProcessor */
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

        unitIds = SkirmishApp.getUnitIdsForCity({
            unitCount: rawMove.unitCount,
            city: rawMove.originId,
        });

        SkirmishClient.sendMove({
            originIds: unitIds,
            targetId: rawMove.targetId,
            action: 'move_unit'
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

    publik.successfulPull = function (gameState) {
        var cities;

        cities = SkirmishGameProcessor.processCities(gameState);

        SkirmishMap.displayCities(cities);
    };

    publik.updateGameState = function () {
        SkirmishClient.pullGameState(publik.successfulPull);
    };

    publik.getUnitIdsForCity = function () {
        throw 'not implemented getUnitIdsForCity';
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
//  asks SkirmishGameProcessor to process the game into workable game data
//  displays all the cities
// 
// 
