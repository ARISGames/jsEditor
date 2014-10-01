define([
	'underscore',
	'jquery',
	'cookie',
	'backbone',
	'marionette',
	'models/session',
	'text!templates/forgot.tpl',
	'views/alert_dialog',
	'i18n',
	'vent'
], function(_, $, Cookie, Backbone, Marionette, session, Template, AlertDialog, i18n, vent) {

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
			var view = this;

			if(this.ui.username.val() === "" && this.ui.email.val() === "") {
				vent.trigger("application:alert", {text: "Enter an E-mail or Username"});
			}
			else {
				session.send_reset_link({
					user_name: this.ui.username.val(),
					email:     this.ui.email.val()
				});

				var alert_dialog = new AlertDialog({text: "If an account exists with this username or email address an email will be sent with a link to reset your account password.", confirm_button: true});

				alert_dialog.on("confirm", function() {
					vent.trigger("application:popup:hide");
					view.onClickCancel();
				});

				vent.trigger("application:popup:show", alert_dialog, "Password Reset E-Mail Sent");
			}
		},

		onClickCancel: function() {
			// gross
			vent.trigger("application.show", new this.options.login_view);
		}
	});
});
