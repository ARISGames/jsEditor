define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'views/game',
	'views/plaques',
	'views/characters',
	'views/items',
	'views/quests',
	'views/locations',
	'views/edit_amf_model',
	'collections/games',
	'collections/plaques',
	'collections/characters',
	'collections/items',
	'collections/quests',
	'collections/locations',
	'models/game',
	'models/plaque',
	'models/character',
	'models/item',
	'models/quest',
	'models/location',
	'vent'
], function($, _, Backbone,
	LoginView, GamesView, GameView, PlaquesView, CharactersView, ItemsView, QuestsView, LocationsView,
	EditAmfModelView,
	GameCollection, PlaqueCollection, CharacterCollection, ItemCollection, QuestCollection, LocationCollection,
	Game, Plaque, Character, Item, Quest, Location,
	vent) {
	return Backbone.Router.extend({

		routes: {
			"": "showGames",
			"login": "showLogin",

			"games":               "showGames",
			"games/new":           "newGame",
			"games/:game_id":      "showGame",
			"games/:game_id/edit": "editGame",

			"games/:game_id/plaques":    "showPlaques",
			"games/:game_id/characters": "showCharacters",
			"games/:game_id/items":      "showItems",
			"games/:game_id/quests":     "showQuests",
			"games/:game_id/locations":  "showLocations",

			"games/:game_id/plaques/new":    "newPlaque",
			"games/:game_id/characters/new": "newCharacter",
			"games/:game_id/items/new":      "newItem",
			"games/:game_id/quests/new":     "newQuest",

			"games/:game_id/plaques/:plaque_id/edit":       "editPlaque",
			"games/:game_id/characters/:character_id/edit": "editCharacter",
			"games/:game_id/items/:item_id/edit":           "editItem",
			"games/:game_id/quests/:quest_id/edit":         "editQuest",
			"games/:game_id/locations/:location_id/edit":   "editLocation"

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
					vent.trigger("application.show", new EditAmfModelView({model: game}));
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

		showQuests: function(game_id) {
			var game   = new Game({game_id: game_id});
			var quests = new QuestCollection([], {parent: game});
			quests.fetch({
				success: function() {
					vent.trigger("application.show", new QuestsView({collection: quests}));
				}
			});
		},

		showLocations: function(game_id) {
			var game      = new Game({game_id: game_id});
			var locations = new LocationCollection([], {parent: game});
			locations.fetch({
				success: function() {
					vent.trigger("application.show", new LocationsView({collection: locations}));
				}
			});
		},

		editPlaque: function(game_id, plaque_id) {
			var plaque = new Plaque({game_id: game_id, node_id: plaque_id})
			plaque.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: plaque}));
				}
			});
		},

		editCharacter: function(game_id, character_id) {
			var character = new Character({game_id: game_id, npc_id: character_id})
			character.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: character}));
				}
			});
		},

		editItem: function(game_id, item_id) {
			var item = new Item({game_id: game_id, item_id: item_id})
			item.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: item}));
				}
			});
		},

		editQuest: function(game_id, quest_id) {
			var quest = new Quest({game_id: game_id, quest_id: quest_id})
			quest.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: quest}));
				}
			});
		},

		editLocation: function(game_id, location_id) {
			var location = new Location({game_id: game_id, location_id: location_id})
			location.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: location}));
				}
			});
		},

		newPlaque: function(game_id) {
			var plaque = new Plaque({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: plaque}));
		},

		newCharacter: function(game_id) {
			var character = new Character({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: character}));
		},

		newItem: function(game_id) {
			var item = new Item({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: item}));
		},

		newQuest: function(game_id) {
			var quest = new Quest({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: quest}));
		},

		newGame: function() {
			var game = new Game();
			vent.trigger("application.show", new EditAmfModelView({model: game}));
		}

	});
});
