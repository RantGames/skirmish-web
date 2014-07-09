/*global $, jQuery, alert, SkirmishDOM, SkirmishClient, SkirmishMap, SkirmishGameState */
"use strict";

var SkirmishApp = (function () {
    var publik = {};
    var hasMoved;

    function succesfulMove() {
        hasMoved = true;
        SkirmishDOM.flash('Move submitted successfully. Waiting for other players.');
    }

    function failedMove(data) {
        if (data.responseJSON) {
            SkirmishDOM.flash(data.responseJSON.message);
        }
    }

    publik.sendMove = function (rawMove) {
        if (hasMoved) {
            return false;
        }

        SkirmishDOM.flash('Sending move');

        var unitIds = SkirmishGameState.getUnitIdsForCity({
            unitCount: rawMove.unitCount,
            city: rawMove.originId,
        });

        SkirmishClient.sendMove({
            originIds: unitIds,
            targetId: rawMove.targetId,
            action: rawMove.moveType + '_unit',
            gameId: SkirmishGameState.gameId(),
        }, succesfulMove, failedMove);
    };

    publik.start = function () {
    };

    publik.processUpdate = function (gameState) {
        hasMoved = false;
        SkirmishDOM.flash('Processing');

        var cities;

        SkirmishGameState.process(gameState);

        cities = SkirmishGameState.cities();

        SkirmishClient.getCurrentPlayerId(publik.updatePlayerId);

        SkirmishMap.displayCities(cities);

        SkirmishApp.checkVictory();

        SkirmishDOM.flash('Ready. Make a move.');
    };

    publik.updatePlayerId = function (data) {
        SkirmishGameState.setCurrentPlayerId(data.player_id);
    };

    publik.joinNewGame = function () {
        SkirmishClient.joinNewGame(publik.processUpdate, function () {
            alert('Failed to join or create game.');
        });
    };

    publik.updateGameState = function () {
        SkirmishDOM.flash('Updating');
        SkirmishClient.pullGameState(publik.processUpdate, publik.joinNewGame);
    };

    publik.checkVictory = function () {
        var winner = SkirmishGameState.getWinner();

        if (winner) {
            SkirmishDOM.flash(winner + ' has won!');
            alert('Winner: ' + winner + '!');
        }

    };

    return publik;
}());

