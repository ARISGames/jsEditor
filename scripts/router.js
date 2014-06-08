define([
	'jquery',
	'underscore',
	'backbone',

	'views/login',
	'views/games',
	'views/scenes',
	'views/game_nav_menu',
	'views/locations',
	'views/media_list',
	'views/upload_media',
	'views/edit_json_model',
	'views/game_editor',

	'collections/games',
	'collections/plaques',
	'collections/items',
	'collections/quests',
	'collections/locations',
	'collections/requirements',
	'collections/conversations',
	'collections/media',
	'collections/scenes',

	'models/game',
	'models/plaque',
	'models/item',
	'models/quest',
	'models/location',
	'models/requirement',
	'models/conversation',
	'models/media',

	'vent'
], function($, _, Backbone,
	LoginView, GamesView, ScenesView, GameNavMenu, LocationsView, MediaListView, UploadMediaView, EditJsonModelView, GameEditorView,
	GameCollection, PlaqueCollection, ItemCollection, QuestCollection, LocationCollection, RequirementCollection, ConversationCollection, MediaCollection,SceneCollection,
	Game, Plaque, Item, Quest, Location, Requirement, Conversation, Media,
	vent) {
	return Backbone.Router.extend({

		routes: {
			"": "listGames",
			"login": "showLogin",

			"games":               "listGames",
			"games/new":           "newGame",
			"games/:game_id/edit": "editGame",

			"games/:game_id/scenes":     "showSceneEditor",
			"games/:game_id/locations":  "listLocations",
			"games/:game_id/media":      "listMedia",


			"games/:game_id/media/new":         "newMedia",

			"games/:game_id/locations/:location_id/edit":       "editLocation",
			"games/:game_id/requirements/:requirement_id/edit": "editRequirement",



			"*nomatch": function(url) { throw "Route not found: "+url; },
		},


		showLogin: function() {
			vent.trigger("application.show", new LoginView);
		},



		/* Game Routes ************************/

		listGames: function() {
			var games = new GameCollection;
			games.fetch({
				success: function() {
					vent.trigger("application.show", new GamesView({collection: games}));
					vent.trigger("application:nav:hide");
					vent.trigger("application:info:hide");
					vent.trigger("application:list:hide");
				}
			});
		},


		showSceneEditor: function(game_id) {
			var game = new Game({game_id: game_id});
			game.fetch({
				success: function() {

					// FIXME parent is a bad naming, also not used
					var scenes = new SceneCollection([], {parent: game});
					scenes.fetch({
						success: function() {
							vent.trigger("application.show",      new ScenesView  ({model: game, collection: scenes}));
							vent.trigger("application:nav:show",  new GameNavMenu ({model: game, active: ".scenes"}));
						}
					});
				}
			});
		},


		editGame: function(game_id) {
			var game = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					vent.trigger("application.show",     new GameEditorView ({model: game}));
					vent.trigger("application:nav:show", new GameNavMenu    ({model: game, active: ".settings"}));
					vent.trigger("application:info:hide");
					vent.trigger("application:list:hide");
				}
			});
		},


		newGame: function() {
			var game = new Game();
			vent.trigger("application.show", new GameEditorView({model: game}));
		},



		/* List Routes ************************/

		listLocations: function(game_id) {
			var game      = new Game({game_id: game_id});
			var locations = new LocationCollection([], {parent: game});
			locations.fetch({
				success: function() {
					vent.trigger("application.show", new LocationsView({collection: locations}));
					// TODO draw 3 pane layout here too. with model updates reflecting.
					// name change, location drag, or field edit in right pane
				}
			});
		},


		listMedia: function(game_id) {
			var game  = new Game({game_id: game_id});
			var media = new MediaCollection([], {parent: game});
			media.fetch({
				success: function() {
					vent.trigger("application.show", new MediaListView({collection: media}));
				}
			});
		},



		/* Edit Routes ************************/

		editLocation: function(game_id, location_id) {
			var location = new Location({game_id: game_id, location_id: location_id})
			location.fetch({
				success: function() {
					vent.trigger("application.show", new EditJsonModelView({model: location}));
				}
			});
		},



		/* New Routes *************************/

		newMedia: function(game_id) {
			var media = new Media({game_id: game_id});
			vent.trigger("application.show", new UploadMediaView({model: media}));
		}
	});
});
