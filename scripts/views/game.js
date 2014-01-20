define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'models/session',
	'text!../../templates/game.tpl',
], function(module, $, _, Backbone, Marionette, Session, Template, t) {
    console.log(module.id);

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
