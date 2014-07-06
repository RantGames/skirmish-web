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

    publik.getUnitIdsForCity = function (args) {
        var unitCount,
            targetCityId,
            city;

        unitCount = args.unitCount;
        targetCityId = args.city;

        city = getCity(targetCityId);

        return city.units.slice(0, unitCount + 1).map(function (unit) { return unit.id; });
    };

    publik.cities = function () {
        return publik.game.cities;
    };

    return publik;
}());