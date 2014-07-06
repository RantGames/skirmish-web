/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameProcessor */
"use strict";

var SkirmishApp = (function () {
    var publicAttributes;

    function login() {
        var credentials = SkirmishDOM.getLoginCredentials();
        SkirmishClient.login(credentials.email, credentials.password, SkirmishDOM.hideLoginForm);
    }

    function start() {
        SkirmishDOM.$loginForm.on('submit', function (e) {
            e.preventDefault();
            login();
        });
    }

    function updateGameState() {
        var game = SkirmishClient.pullGameState(),
            cities = SkirmishGameProcessor.processCities(game);

        SkirmishMap.displayCities(cities);
    }

    publicAttributes = {
        start: start,
        login: login,
        updateGameState: updateGameState,
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
