/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameProcessor */
"use strict";

var SkirmishApp = (function () {
    var publicAttributes;

    function login() {
        var credentials = SkirmishDOM.getLoginCredentials();
        SkirmishClient.login(credentials.email, credentials.password, SkirmishDOM.hideLoginForm);
    }

    function sendMove() {
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
    }

    function start() {
        SkirmishDOM.$loginForm.on('submit', function (e) {
            e.preventDefault();
            login();
        });

        SkirmishDOM.$testMoveForm.on('submit', function (e) {
            e.preventDefault();
            sendMove();
        });
    }

    function successfulPull(gameState) {
        var cities;

        cities = SkirmishGameProcessor.processCities(gameState);

        SkirmishMap.displayCities(cities);
    }

    function updateGameState() {
        SkirmishClient.pullGameState(successfulPull);
    }

    function getUnitIdsForCity() {
        throw 'not implemented getUnitIdsForCity';
    }

    publicAttributes = {
        start: start,
        login: login,
        updateGameState: updateGameState,
        successfulPull: successfulPull,
        sendMove: sendMove,
        getUnitIdsForCity: getUnitIdsForCity
    };

    return publicAttributes;
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
