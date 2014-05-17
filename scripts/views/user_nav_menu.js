define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/user_nav_menu.tpl',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, session, vent) {

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		templateHelpers: function() {
			return {
				username: session.username()
			};
		},

		events: {
			"click .logout":    "onClickLogout"
		},

		onClickLogout: function() {
			// just listen for event on session
			session.logout();
		}
	});
});
