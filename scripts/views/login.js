define([
	'underscore',
	'jquery',
	'cookie',
	'backbone',
	'marionette',
	'models/session',
	'text!templates/login.tpl',
	'i18n'
], function(_, $, Cookie, Backbone, Marionette, session, Template, i18n) {

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
			"click #login":    "onClickLogin",
			"click #register": "onClickRegister",
			"click .change-language": "onClickChangeLanguage"
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
		},

		onClickRegister: function() {
			// TODO add field validation
			// and trigger event instead of relying on session.
			//
			session.register({
				username: this.$el.find('#username').val(),
				password: this.$el.find('#password').val()
			});

			// Don't submit form
			event.preventDefault();
		},

		onClickChangeLanguage: function(event) {
			var button = this.$el.find(".current_language")
			var requested_language = $(event.target)
			button.text(requested_language.text());
			$.cookie("language", requested_language.attr("data-language"));
			window.location.reload();
		}
	});
});
