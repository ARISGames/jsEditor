define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'views/game',
	'views/edit_game',
	'views/plaques',
	'views/characters',
	'views/items',
	'vent',
	'collections/games',
	'collections/plaques',
	'collections/characters',
	'collections/items',
	'models/game'
], function($, _, Backbone, LoginView, GamesView, GameView, EditGameView, PlaquesView, CharactersView, ItemsView, vent, GameCollection, PlaqueCollection, CharacterCollection, ItemCollection, Game) {
	return Backbone.Router.extend({

		routes: {
			"": "showGames",
			"login": "showLogin",

			"games": "showGames",
			"games/:game_id": "showGame",
			"games/:game_id/edit": "editGame",

			"games/:game_id/plaques": "showPlaques",
			"games/:game_id/characters": "showCharacters",
			"games/:game_id/items": "showItems",
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

		showCharacters: function(game_id) {
			var game       = new Game({game_id: game_id});
			var characters = new CharacterCollection([], {parent: game});
			characters.fetch({
				success: function() {
					vent.trigger("application.show", new CharactersView({collection: characters}));
				}
			});
		},

		showItems: function(game_id) {
			var game  = new Game({game_id: game_id});
			var items = new ItemCollection([], {parent: game});
			items.fetch({
				success: function() {
					vent.trigger("application.show", new ItemsView({collection: items}));
				}
			});
		},

	});
});
