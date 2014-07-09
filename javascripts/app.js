/*global $, jQuery, alert, SkirmishApp, SkirmishClient, SkirmishMap, document */
"use strict";

$(document).ready(function () {
    SkirmishMap.initialize();
    SkirmishApp.start();
    SkirmishApp.updateGameState();
    SkirmishTrigger.registerEvents();

  var pusher = new Pusher('013b1cfdc9072c8dbe04');
  var channel = pusher.subscribe('skirmish_channel');

  setTimeout(function() {
    React.renderComponent(new NotificationBox({
      messages: SkirmishApp.messageBox.all,
      channel: channel,
      playerId: SkirmishGameState.getCurrentPlayerId(),
      chatEndpoint: SkirmishClient.endPoints.chat
    }), document.getElementById("notification-box"));
  }, 1000);
});
