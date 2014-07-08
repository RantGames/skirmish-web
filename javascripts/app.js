/*global $, jQuery, alert, SkirmishApp, SkirmishClient, SkirmishMap, document */
"use strict";

$(document).ready(function () {
    SkirmishMap.initialize();
    SkirmishApp.start();
    SkirmishApp.updateGameState();
    SkirmishTrigger.registerEvents();
});
