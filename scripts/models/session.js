define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'cookie',
	'config',
	'vent'
], function(module, $, _, Backbone, Cookie, config, vent) {
	console.log(module.id);

	var Session = Backbone.Model.extend({
		logged_in: function() {
			if($.cookie('auth_token') != undefined) {
				return true;
			}
			else {
				return false;
			}
		},

		login: function(options) {
			$.ajax({
				url: config.aris_api_url + "users.logIn",
				type: 'POST',
				data: JSON.stringify({"user_name": options.username, "password": options.password, "permission": "read_write"}),
				processData: false,
				success: function(data) {
					var json = JSON.parse(data);
					if(json.returnCode == 0) {
						$.cookie('username',   json.data.user_name);
						$.cookie('editor_id',  json.data.user_id);
						$.cookie('auth_token', json.data.read_write_key);

						vent.trigger('session.login');
					}
					else {
						alert(json.returnCodeDescription);
					}
				}
			});
		},

		logout: function() {
			$.removeCookie('username');
			$.removeCookie('editor_id');
			$.removeCookie('auth_token');

			vent.trigger('session.logout');
		},

		username: function() {
			return $.cookie('username');
		},

		editor_id: function() {
			return $.cookie('editor_id');
		},

		auth_token: function () {
			return $.cookie('auth_token');
		}
	});

	return new Session();
});
