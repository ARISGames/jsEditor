define([
	'jquery',
	'underscore',
	'backbone',

	'views/login',
	'views/games',
	'views/scenes',
	'views/game_nav_menu',
	'views/locations',
	'views/quests',
	'views/media_editor',
	'views/edit_json_model',
	'views/game_editor',
	'views/editors',
	'views/game_objects_organizer',
	'views/locations_organizer',
	'views/media_organizer',
	'views/conversations',

	'collections/games',
	'collections/editors',
	'collections/game_triggers',
	'collections/instances',
	'collections/dialogs',
	'collections/items',
	'collections/plaques',
	'collections/web_pages',
	'collections/media',
	'collections/scenes',
	'collections/quests',
	'collections/characters',
	'collections/factories',

	'models/game',
	'models/item',
	'models/media',

	'vent',
	'models/session'
], function($, _, Backbone,
	LoginView, GamesView, ScenesView, GameNavMenu, LocationsView, QuestsView, MediaEditorView, EditJsonModelView, GameEditorView, EditorSharingView, GameObjectsOrganizerView, LocationsOrganizerView, MediaOrganizerView, ConversationsView,
	GameCollection, EditorsCollection, GameTriggersCollection, InstancesCollection, DialogsCollection, ItemCollection, PlaqueCollection, WebPagesCollection, MediaCollection, SceneCollection, QuestsCollection, CharactersCollection, FactoriesCollection,
	Game, Item, Media,
	vent, session) {
	return Backbone.Router.extend({

		routes: {
			"": "listGames",
			"login": "showLogin",

			"games":               "listGames",
			"games/:game_id/edit":  "editGame",
			"games/:game_id/share": "editSharing",
			"games/:game_id/tabs":  "editTabs",

			"games/:game_id/scenes":       "showSceneEditor",
			"games/:game_id/locations":    "listLocations",
			"games/:game_id/quests":       "listQuests",
			"games/:game_id/media":        "listMedia",
			"games/:game_id/conversations":"listConversations",

			"*nomatch": function(url) { throw "Route not found: "+url; },
		},


		showLogin: function() {
			vent.trigger("application.show", new LoginView);
		},



		/* Game Routes ************************/

		listGames: function() {
			// FIXME hack to prevent clicking the logo going to blank area when database is empty
			if(!session.logged_in()) { return false; }

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

					var scenes    = new SceneCollection    ([], {parent: game});
					var plaques   = new PlaqueCollection   ([], {parent: game});
					var items     = new ItemCollection     ([], {parent: game});
					var dialogs   = new DialogsCollection  ([], {parent: game});
					var pages     = new WebPagesCollection ([], {parent: game});
					var factories = new FactoriesCollection([], {parent: game});

					// TODO catch errors if any fail (since its a non-standard failure)
					$.when(scenes.fetch(), dialogs.fetch(), plaques.fetch(), items.fetch(), pages.fetch(), factories.fetch()).done(function()
					{
						vent.trigger("application.show",      new ScenesView  ({model: game, collection: scenes}));
						vent.trigger("application:nav:show",  new GameNavMenu ({model: game, active: ".scenes"}));
						vent.trigger("application:list:show", new GameObjectsOrganizerView({model: game, dialogs: dialogs, plaques: plaques, items: items, pages: pages, factories: factories}));
						vent.trigger("application:info:hide");
					});
				}
			});
		},


		editGame: function(game_id) {
			var game = new Game({game_id: game_id});
			game.fetch({
				success: function() {

					var icons = {
						icon:  new Media({media_id: game.get("icon_media_id")}),
						media: new Media({media_id: game.get("media_id"     )})
					};

					var scenes = new SceneCollection([], {parent: game});

					$.when(icons.icon.fetch(), icons.media.fetch(), scenes.fetch()).done(function()
					{
						vent.trigger("application.show",     new GameEditorView (_.extend({model: game, scenes: scenes}, icons)));
						vent.trigger("application:nav:show", new GameNavMenu    ({model: game, active: ".game"}));
						vent.trigger("application:info:hide");
						vent.trigger("application:list:hide");
					});
				}
			});
		},


		editSharing: function(game_id) {
			var game = new Game({game_id: game_id});

			var editors = new EditorsCollection([], {parent: game});

			$.when(editors.fetch()).done(function()
			{
				editors.invoke('set', 'game_id', game.id);

				vent.trigger("application.show",     new EditorSharingView ({model: game, collection: editors}));
				vent.trigger("application:nav:show", new GameNavMenu       ({model: game, active: ".game"}));
				vent.trigger("application:info:hide");
				vent.trigger("application:list:hide");
			});
		},


		/* List Routes ************************/

		listLocations: function(game_id) {
			var game = new Game({game_id: game_id});

			var triggers  = new GameTriggersCollection([], {parent: game});
			var instances = new InstancesCollection   ([], {parent: game});

			$.when(triggers.fetch(), instances.fetch()).done(function()
			{
				// Just give location triggers to view
				var location_selection = triggers.where({type: "LOCATION"});
				var locations = new GameTriggersCollection(location_selection, {parent: game});

				vent.trigger("application.show",      new LocationsView ({model: game, collection: locations}));
				vent.trigger("application:nav:show",  new GameNavMenu   ({model: game, active: ".locations"}));
				vent.trigger("application:list:show", new LocationsOrganizerView({locations: locations, instances: instances}));
				vent.trigger("application:info:hide");
			});
		},

		listQuests: function(game_id) {
			var game  = new Game({game_id: game_id});

			var quests = new QuestsCollection([], {parent: game});
			quests.fetch({
				success: function() {
					vent.trigger("application.show",     new QuestsView  ({model: game, collection: quests}));
					vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".quests"}));
					vent.trigger("application:list:hide");
					vent.trigger("application:info:hide");
				}
			});
		},

		listMedia: function(game_id) {
			var game  = new Game({game_id: game_id});

			var media = new MediaCollection([], {parent: game});
			media.fetch({
				success: function() {
					vent.trigger("application.show",      new MediaEditorView ({model: game, collection: media}));
					vent.trigger("application:nav:show",  new GameNavMenu     ({model: game, active: ".media"}));
					vent.trigger("application:list:show", new MediaOrganizerView({collection: media}));
					vent.trigger("application:info:hide");
				}
			});
		},

		listConversations: function(game_id) {
			var game  = new Game({game_id: game_id});

			var conversations = new DialogsCollection   ([], {parent: game});

			$.when(conversations.fetch()).done(function() {
				vent.trigger("application.show",      new ConversationsView ({model: game, collection: conversations}));
				vent.trigger("application:nav:show",  new GameNavMenu       ({model: game, active: ".conversations"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},
	});
});
