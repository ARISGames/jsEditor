define([
	'underscore',
	'jquery',
	'cookie',
	'backbone',
	'marionette',
	'models/session',
	'text!templates/login.tpl',
	'views/register',
	'i18n',
	'vent'
], function(_, $, Cookie, Backbone, Marionette, session, Template, RegisterView, i18n, vent) {

	var LoginView = Backbone.Marionette.ItemView.extend({
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
			"click #login":    "onClickLogin",
			"click #register": "onClickRegister",
			"click .change-language": "onClickChangeLanguage"
		},

		ui: {
			username: "#username",
			password: "#password"
		},

		onClickLogin: function() {
			// TODO add field validation
			// and trigger event instead of relying on session.

			if(this.ui.username.val() === "" || this.ui.password.val() === "") {
				vent.trigger("application:alert", {text: "Username and Password can't be blank"});
			}
			else {
				session.login({
					username: this.ui.username.val(),
					password: this.ui.password.val()
				});
			}
		},

		onClickRegister: function() {
			var register_view = new RegisterView({login_view: LoginView});

			vent.trigger("application.show", register_view);
		},

		onClickChangeLanguage: function(event) {
			var button = this.$el.find(".current_language")
			var requested_language = $(event.target)
			button.text(requested_language.text());
			$.cookie("language", requested_language.attr("data-language"));
			window.location.reload();
		}
	});

	return LoginView;
});
