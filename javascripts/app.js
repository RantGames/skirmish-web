/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";
var SkirmishClient = (function () {

    var $loginForm,
        publicAttributes;

    function login(e) {
        e.preventDefault();
        console.log('submitting login form');
        var rawCredentials = $loginForm.serializeArray(),
            credentials,
            i,
            cred;

        credentials = {
            'user': {}
        };

        for (i = 0; i < rawCredentials.length; i += 1) {
            cred = rawCredentials[i];

            credentials.user[cred.name] = cred.value;
        }

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

    function setupAjax() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
            }
        });
    }

    function start() {
        $loginForm = $('#login-form');
        console.log('starting SkirmishClient');
        $loginForm.on('submit', login);
        setupAjax();
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
        if (o[this.name] !== undefined) {
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