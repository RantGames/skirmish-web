/*global $, jQuery, alert, City*/

"use strict";
var SkirmishGameState = (function () {
    var publik = {};

        // game = {};

    publik.game = {};

    function getCity(id) {
        var i,
            city;

        for (i = 0; i < publik.game.cities.length; i += 1) {
            city = publik.game.cities[i];
            if (city.id === id) {
                return city;
            }
        }
    }

    function processPlayers(rawPlayersData) {
        var players = {};

        rawPlayersData.forEach(function (player) {
            players[player.id] = player.name;
        });

        return players;
    }

    // Cities need to know their player id, so this function
    // takes in a list of players who each have a list of cities
    // and returns a list of cities with the playerId set

    function assignPlayerAttributesToCities(players) {
        var cities = [];

        players.forEach(function (player) {
            player.cities.forEach(function (city) {
                city.playerId = player.id;
                city.gravatarHash = player.gravatar_hash;
                cities.push(city);
            });
        });

        return cities;
    }

    function processCity(rawCity) {
        var city = new City(rawCity.name, [rawCity.latitude, rawCity.longitude], rawCity.playerId, rawCity.id, rawCity.gravatarHash);

        rawCity.units.forEach(function (unit) {
            city.addUnit(unit);
        });

        return city;
    }

    function processCities(cities) {
        return $.map(cities, processCity);
    }

    function processCitiesFromPlayers(players) {
        var rawCities = assignPlayerAttributesToCities(players);
        return processCities(rawCities);
    }

    function getPlayerName(id) {
        return publik.game.players[id];
    }

    publik.process = function (data) {
        var gameState = data.game;

        publik.game = {
            id: gameState.id,
            winner: gameState.winner,
            cities: processCitiesFromPlayers(gameState.players),
            players: processPlayers(gameState.players)
        };
    };

    publik.setCurrentPlayerId = function(playerId) {
        publik.game.currentPlayer = { id: playerId };
    }

    publik.getCurrentPlayerId = function() {
        return publik.game.currentPlayer.id;
    }


    publik.getUnitIdsForCity = function (args) {
        var unitCount,
            targetCityId,
            city;

        unitCount = args.unitCount;
        targetCityId = args.city;

        city = getCity(targetCityId);

        return city.units.slice(0, unitCount).map(function (unit) { return unit.id; });
    };

    publik.cities = function () {
        return publik.game.cities;
    };

    publik.gameId = function () {
        return publik.game.id;
    };

    publik.players = function () {
        return publik.game.players;
    };

    publik.getWinner = function () {
        return getPlayerName(publik.game.winner);
    };

    return publik;
}());
