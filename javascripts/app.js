/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {

    var $loginForm,
        publicAttributes;

    function login(e) {
        e.preventDefault();
        console.log('submitting login form');
        var credentials = $loginForm.serializeObject();

        console.log(credentials);


        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/users/sign_in',
            data: JSON.stringify(credentials),
            success: function () {
                console.log('signed in');
            },
            contentType: "application/json",
            dataType: 'json'
        });
    }

    function start() {
        $loginForm = $('#login-form');
        console.log('starting SkirmishClient');
        $loginForm.on('submit', login);
    }

    publicAttributes = {
        start: start
    };

    return publicAttributes;
}());

$(function () {
    console.log('js loaded');
    SkirmishClient.start();
});



// http://css-tricks.com/snippets/jquery/serialize-form-to-json/
$.fn.serializeObject = function () {
    var o = {},
        a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};