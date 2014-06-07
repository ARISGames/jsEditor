define([
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'text!../../templates/login.tpl',
	'i18n'
], function(_, Backbone, Marionette, session, Template, i18n) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				gettext: function(text) { return i18n.gettext(text); },
			}
		},

		events: {
			"click #login": "onClickLogin"
		},

		onClickLogin: function() {
			// TODO add field validation
			// and trigger event instead of relying on session.
			//
			session.login({
				username: this.$el.find('#username').val(),
				password: this.$el.find('#password').val()
			});

			// Don't submit form
			event.preventDefault();
		}
	});
});
