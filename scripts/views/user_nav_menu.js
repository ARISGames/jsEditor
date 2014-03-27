define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/user_nav_menu.tpl',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, Session, vent) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		templateHelpers: function() {
			var session = new Session();
			return {
				username: session.username()
			};
		},

		events: {
			"click .logout":    "onClickLogout"
		},

		onClickLogout: function() {
			// just listen for event on session
			var session = new Session();
			session.logout();
		}
	});
});
