define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'views/game',
	'views/edit_game',
	'views/plaques',
	'vent',
	'collections/games',
	'collections/plaques',
	'models/game'
], function($, _, Backbone, LoginView, GamesView, GameView, EditGameView, PlaquesView, vent, GameCollection, PlaqueCollection, Game) {
	return Backbone.Router.extend({

		routes: {
			"": "showGames",
			"login": "showLogin",

			"games": "showGames",
			"games/:game_id": "showGame",
			"games/:game_id/edit": "editGame",

			"games/:game_id/plaques": "showPlaques",
		},

		showLogin: function() {
			vent.trigger("application.show", new LoginView);
		},

		showGames: function() {
			var games = new GameCollection;
			games.fetch({
				success: function() {
					vent.trigger("application.show", new GamesView({collection: games}));
				}
			});
		},

		showGame: function(game_id) {
			var game = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					vent.trigger("application.show", new GameView({model: game}));
				}
			});
		},

		editGame: function(game_id) {
			var game = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					vent.trigger("application.show", new EditGameView({model: game}));
				}
			});
		},

		showPlaques: function(game_id) {
			var game    = new Game({game_id: game_id});
			var plaques = new PlaqueCollection([], {parent: game});
			plaques.fetch({
				success: function() {
					vent.trigger("application.show", new PlaquesView({collection: plaques}));
				}
			});
		},

	});
});
