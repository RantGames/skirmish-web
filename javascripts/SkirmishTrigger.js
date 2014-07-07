/*global $, jQuery, SkirmishApp*/

"use strict";

var SkirmishTrigger = (function () {
  var publik = {};

  publik.registerEvents = function () {
    var pusher = new Pusher('013b1cfdc9072c8dbe04');
    var channel = pusher.subscribe('skirmish_channel');
    publik.registerUpdateMapEvent(pusher, channel);
  }

  publik.registerUpdateMapEvent = function (pusher, channel) {
    channel.bind('update_state', function(data) {
      if (data.message == 'pull_game_state') {
        SkirmishApp.updateGameState();
        showUpdateMessage()
      };
    });
  };

  var showUpdateMessage = function () {
    var $msg = '#status-message'
    $($msg).slideDown(function() {
      $($msg).show()
      setTimeout(function() {
        $($msg).hide();
        $($msg).slideUp();
      }, 3000);
    });
  };

  return publik;

}());

