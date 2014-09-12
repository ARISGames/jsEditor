define([
	'underscore',
	'jquery',
	'cookie',
	'backbone',
	'marionette',
	'models/session',
	'text!templates/register.tpl',
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
			"click #register": "onClickRegister",
			"click #cancel":   "onClickCancel"
		},

		ui: {
			username: "#username",
			email:    "#email",
			password: "#password",
			password_confirm: "#password-confirm"
		},

		onClickRegister: function() {
			if(this.ui.username.val() === "" || this.ui.password.val() === "") {
				vent.trigger("application:alert", {text: "Username and Password can't be blank"});
			}
			else if(this.ui.password.val() !== this.ui.password_confirm.val()) {
				vent.trigger("application:alert", {text: "Passwords do not match."});
			}
			else {
				session.register({
					username: this.ui.username.val(),
					email:    this.ui.email.val(),
					password: this.ui.password.val()
				});
			}
		},

		onClickCancel: function() {
			// gross
			vent.trigger("application.show", new this.options.login_view);
		}
	});
});
