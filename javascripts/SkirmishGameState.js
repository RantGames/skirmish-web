/*global $, jQuery, alert, City*/

"use strict";
var SkirmishGameState = (function () {
    var publik = {};
        // game = {};

    publik.game = {};

    publik.process = function (gameState) {
        // TODO: refactor to abide by SOLID
        //  suggestion, break out method for creating city from iteration work
        var player,
            city,
            cities = [],
            i,
            j,
            k,
            unit,
            city_model,
            game;

        game = gameState.game;

        for (i = 0; i < game.players.length; i += 1) {
            player = game.players[i];

            for (j = 0; j < player.cities.length; j += 1) {
                city = player.cities[j];

                city_model = new City(city.name, [city.latitude, city.longitude], player.id);

                for (k = 0; k < city.units.length; k += 1) {
                    unit = city.units[i];
                    city_model.addUnit(unit);
                }

                cities.push(city_model);
            }
        }

        publik.game.cities = cities;
    };

    publik.getUnitIdsForCity = function () {
        throw 'not implemented getUnitIdsForCity';
    };

    publik.cities = function () {
        return publik.game.cities;
    };

    return publik;
}());