define([
	'jquery',
	'underscore',
	'backbone',

	'views/login',
	'views/games',
	'views/scenes',
	'views/game_nav_menu',
	'views/locations',
	'views/media_editor',
	'views/edit_json_model',
	'views/game_editor',
	'views/game_objects_organizer',
	'views/locations_organizer',
	'views/media_organizer',

	'collections/games',
	'collections/game_triggers',
	'collections/dialogs',
	'collections/items',
	'collections/plaques',
	'collections/web_pages',
	'collections/requirements',
	'collections/conversations',
	'collections/media',
	'collections/scenes',

	'models/game',
	'models/item',
	'models/requirement',
	'models/conversation',
	'models/media',

	'vent'
], function($, _, Backbone,
	LoginView, GamesView, ScenesView, GameNavMenu, LocationsView, MediaEditorView, EditJsonModelView, GameEditorView, GameObjectsOrganizerView, LocationsOrganizerView, MediaOrganizerView,
	GameCollection, GameTriggersCollection, DialogsCollection, ItemCollection, PlaqueCollection, PageCollection, RequirementCollection, ConversationCollection, MediaCollection, SceneCollection,
	Game, Item, Requirement, Conversation, Media,
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

					var scenes  = new SceneCollection  ([], {parent: game});
					var plaques = new PlaqueCollection ([], {parent: game});
					var items   = new ItemCollection   ([], {parent: game});
					var dialogs = new DialogsCollection([], {parent: game});
					var pages   = new PageCollection   ([], {parent: game});

					// TODO catch errors if any fail (since its a non-standard failure)
					$.when(scenes.fetch(), dialogs.fetch(), plaques.fetch(), items.fetch(), pages.fetch()).done(function()
					{
						vent.trigger("application.show",      new ScenesView  ({model: game, collection: scenes}));
						vent.trigger("application:nav:show",  new GameNavMenu ({model: game, active: ".scenes"}));
						vent.trigger("application:list:show", new GameObjectsOrganizerView({model: game, dialogs: dialogs, plaques: plaques, items: items, pages: pages}));
						vent.trigger("application:info:hide");
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
			var game = new Game({game_id: game_id});

			game.fetch({
				success: function() {
					var triggers  = new GameTriggersCollection([], {parent: game});

					triggers.fetch({
						success: function() {
							var location_triggers = triggers.where({type: "LOCATION"});
							var locations = new GameTriggersCollection(location_triggers, {parent: game});

							vent.trigger("application.show",      new LocationsView ({model: game, collection: locations}));
							vent.trigger("application:nav:show",  new GameNavMenu   ({model: game, active: ".locations"}));
							vent.trigger("application:list:show", new LocationsOrganizerView({collection: locations}));
							vent.trigger("application:info:hide");
						}
					});
				}
			});
		},


		listMedia: function(game_id) {
			var game  = new Game({game_id: game_id});
			game.fetch({
				success: function() {
					var media = new MediaCollection([], {parent: game});
					media.fetch({
						success: function() {
							vent.trigger("application.show",      new MediaEditorView ({model: game, collection: media}));
							vent.trigger("application:nav:show",  new GameNavMenu     ({model: game, active: ".media"}));
							vent.trigger("application:list:show", new MediaOrganizerView({collection: media}));
							vent.trigger("application:info:hide");
						}
					});
				}
			});
		}
	});
});
