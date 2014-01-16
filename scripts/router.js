define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'vent',
	'collections/games',
	'models/game'
], function($, _, Backbone, LoginView, GamesView, vent, GameCollection, Game) {
	return Backbone.Router.extend({

		routes: {
			"": "showGames",
			"login": "showLogin",
			"games": "showGames",
			"games/:game_id": "showGame"
		},

		showLogin: function() {
			vent.trigger("application.show", new LoginView);
		},

		showGames: function() {
			games = new GameCollection;
			games.fetch({
				success: function() {
					vent.trigger("application.show", new GamesView({collection: games}));
				}
			});
		},

		showGame: function(game_id) {
			console.log("show game", game_id);
		}
	});
});
