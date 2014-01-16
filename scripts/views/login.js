define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'text!../../templates/login.tpl',
	'i18n!../locale/nls/login.js'
], function($, _, Backbone, Marionette, Session, Template, t) {
	return Backbone.Marionette.ItemView.extend({
		template: function(data) {
			return _.template(Template, _.extend(data, {t:t}));
		},
	
		events: {
			"click .login": "onClickLogin"
		},

		onClickLogin: function() {
			var session = new Session;
			session.login({
				username: this.$el.find('.username').val(),
				password: this.$el.find('.password').val()
			});
		}
	});
});
