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

		login: function(user, password) {
			$.cookie('auth_token', '123456');

			vent.trigger('session.login');
		}
	});
});
