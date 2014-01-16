define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'vent'
], function($, _, Backbone, LoginView, GamesView, vent) {
	return Backbone.Router.extend({

		routes: {
			"": "showWelcome",
			"login": "showLogin",
			"games": "showGames",
			"games/:game_id": "showGame"
		},

		showWelcome: function() {
			console.log("show welcome");
		},

		showLogin: function() {
			vent.trigger("application.show", new LoginView);
		},

		showGames: function() {
			vent.trigger("application.show", new GamesView);
		},

		showGame: function(game_id) {
			console.log("show game", game_id);
		}
	});
});
