/*global $, jQuery, alert, document, SkirmishClient, SkirmishMap, google */
"use strict";
var SkirmishMoves = (function () {
    var publik = {};

    publik.moves = [];

    publik.addMove = function (move) {
        this.moves.push(move);
    };

    publik.Move = function(args) {
        this.origin_ids = args.origin_ids;
        this.target_id = args.target_id;
        this.action = args.action;
    };

    return publik;
}());