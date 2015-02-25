define(function(require)
{
	var _              = require('underscore');
	var Backbone       = require('backbone');
	var Template       = require('text!templates/migration_link_user.tpl');
	var vent           = require('vent');
	var config         = require('config');
	var session        = require('models/session');

	var i18n           = require('i18n');

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				gettext: function(text) { return i18n.gettext(text); }
			}
		},

		events: {
			"click #link": "onClickLink"
		},

		ui: {
			username: "#username",
			password: "#password"
		},

		onClickLink: function() {
			console.log("saving");
			var view = this;

			if(this.ui.username.val() === "" || this.ui.password.val() === "") {
				vent.trigger("application:alert", {text: "Enter a Username and Password."});
			}
			else {
				var link_data = {"auth": session.auth_json(), "v1_user":this.ui.username.val(), "v1_pass":this.ui.password.val()};
				$.ajax({
					url: config.migration_api_url + "migration.linkV1EditorToV2User",
					type: 'POST',
					data: JSON.stringify(link_data),
					processData: false,
					success: function(data) {
						var link_response = JSON.parse(data);

						console.log("link_response", link_response);

						if(link_response.returnCode === 1) {
							vent.trigger("application:alert", {text: "Invalid Username or Password."});
						}
						else if(link_response.returnCode === 2) {
							vent.trigger("application:alert", {text: "Already linked to an another account."});
						}
						else if(link.returnCode === 0) {
							vent.trigger("application:user_migrated");
						}
						else {
							throw "linkV1UserToV2User threw: " + link_response.returnCode + " " + link_response.returnCodeDescription;
						}
					}
				});
			}
		}
	});
});
