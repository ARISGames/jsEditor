define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'views/game',
	'views/edit_game',
	'vent',
	'collections/games',
	'models/game'
], function($, _, Backbone, LoginView, GamesView, GameView, EditGameView, vent, GameCollection, Game) {
	return Backbone.Router.extend({

		routes: {
			"": "showGames",
			"login": "showLogin",
			"games": "showGames",
			"games/:game_id": "showGame",
			"games/:game_id/edit": "editGame"
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
			game = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					vent.trigger("application.show", new GameView({model: game}));
				}
			});
		},

		editGame: function(game_id) {
			game = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					vent.trigger("application.show", new EditGameView({model: game}));
				}
			});
		}
	});
});
