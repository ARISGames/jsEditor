define([
	'jquery',
	'underscore',
	'backbone',
	'cookie',
	'vent'
], function($, _, Backbone, Cookie, vent) {

	return Backbone.Model.extend({
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
				url:"https://arisgames.org/server/json.php/v1.editors.getToken/"+options.username+"/"+options.password+"/read_write",
				success: function(data) {
					var json = JSON.parse(data);
					if(json.returnCode == 0) {
						$.cookie('editor_id',  json.data.editor_id);
						$.cookie('auth_token', json.data.read_write_token);

						vent.trigger('session.login');
					}
					else {
						alert(json.returnCodeDescription);
					}
				}
			});
		},

		editor_id: function() {
			return $.cookie('editor_id');
		},

		auth_token: function () {
			return $.cookie('auth_token');
		}
	});
});
