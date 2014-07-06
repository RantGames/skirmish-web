/*global $, jQuery, alert, SkirmishApp, SkirmishMap, document */
"use strict";

$(document).ready(function () {
    SkirmishMap.initialize();
    SkirmishApp.start();
    SkirmishApp.updateGameState();
});