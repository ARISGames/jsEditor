define([
	'underscore',
	'jquery',
	'cookie',
	'backbone',
	'marionette',
	'models/session',
	'text!templates/forgot.tpl',
	'i18n',
	'vent'
], function(_, $, Cookie, Backbone, Marionette, session, Template, i18n, vent) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				gettext: function(text) { return i18n.gettext(text); },
				available_languages: i18n.available_languages,
				current_language: i18n.current_language
			}
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click #send":   "onClickSend",
			"click #cancel": "onClickCancel"
		},

		ui: {
			username: "#username",
			email:    "#email"
		},

		onClickSend: function() {
			if(this.ui.username.val() === "" && this.ui.email.val() === "") {
				vent.trigger("application:alert", {text: "Enter an E-mail or Username"});
			}
			else {
				session.send_reset_link({
					user_name: this.ui.username.val(),
					email:     this.ui.email.val()
				});
			}
		},

		onClickCancel: function() {
			// gross
			vent.trigger("application.show", new this.options.login_view);
		}
	});
});
