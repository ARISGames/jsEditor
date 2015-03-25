define(function(require)
{
	var $                        = require('jquery');
	var _                        = require('underscore');
	var Backbone                 = require('backbone');

	var LoginView                = require('views/login');
	var GamesLayoutView          = require('views/games_layout');
	var GamesView                = require('views/games');
	var MigrationGamesView       = require('views/migration_games');
	var MigrationLinkUserView    = require('views/migration_link_user');
	var ScenesView               = require('views/scenes');
	var GameNavMenu              = require('views/game_nav_menu');
	var LocationsView            = require('views/locations');
	var QuestsView               = require('views/quests');
	var MediaEditorView          = require('views/media_editor');
	var EditJsonModelView        = require('views/edit_json_model');
	var GameEditorView           = require('views/game_editor');
	var EditorSharingView        = require('views/editors');
	var GameObjectsOrganizerView = require('views/game_objects_organizer');
	var LocationsOrganizerView   = require('views/locations_organizer');
	var MediaOrganizerView       = require('views/media_organizer');
	var ConversationsView        = require('views/conversations');
	var TabsView                 = require('views/tabs');
	var TagsView                 = require('views/tags');
	var NotesView                = require('views/notes');

	var MigrationGameCollection  = require('collections/migration_games');
	var EditorsCollection        = require('collections/editors');
	var GameTriggersCollection   = require('collections/game_triggers');
	var NotesCollection          = require('collections/notes');

	var Game                     = require('models/game');

	var vent                     = require('vent');
	var session                  = require('models/session');
	var storage                  = require('storage');



	return Backbone.Router.extend({

		routes: {
			"": "listGames",
			"login": "showLogin",

			"games":               "listGames",
			"games/:game_id/edit":  "editGame",
			"games/:game_id/share": "editSharing",
			"games/:game_id/tabs":  "editTabs",
			"games/:game_id/tags":  "editTags",
			"games/:game_id/notes": "editNotes",

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

			var games           = storage.games;
			var migration_games = new MigrationGameCollection;

			var games_layout    = new GamesLayoutView();
			var games_view      = new GamesView({collection: games});

			vent.trigger("application.show", games_layout);

			games_layout.games.show(games_view);


			vent.trigger("application:nav:hide" );
			vent.trigger("application:info:hide");
			vent.trigger("application:list:hide");

			// Conditionally add migration table.
			var migration_list_added = false;
			migration_games.on("add", function() {
				if(migration_list_added) {
					return;
				}

				var migrations_view = new MigrationGamesView({collection: migration_games});
				games_layout.migration_games.show(migrations_view);
				migration_list_added = true;
			});

			// Conditionally add link user fields.
			migration_games.fetch({
				amf_error: function(code, description) {
					if(code === 2) {
						var link_user_view = new MigrationLinkUserView();
						games_layout.migration_games.show(link_user_view);

						// Display game list once migrated
						vent.on("application:user_migrated", function() {
							migration_games.fetch();

							var migrations_view = new MigrationGamesView({collection: migration_games});
							games_layout.migration_games.show(migrations_view);
							migration_list_added = true;
						});
					}
				}
			});
			games.fetch();
		},


		showSceneEditor: function(game_id) {
			// FIXME ability to promise so we don't fetch twice? or guarentee a new fetch.
			var game = storage.games.retrieve(game_id);
			storage.for(game);

			// TODO catch errors if any fail (since its a non-standard failure)
			$.when(game.fetch(), storage.instances.fetch(), storage.triggers.fetch(), storage.scenes.fetch(), storage.dialogs.fetch(), storage.plaques.fetch(), storage.items.fetch(), storage.web_pages.fetch(), storage.factories.fetch()).done(function()
			{
				// TODO make game a promise and store it so we can access the same game instance in other tabs.
				// then 'intro scene' test can just be if this.model.is(game.intro_scene())
				var intro_scene = storage.scenes.get(game.get("intro_scene_id"));

				vent.trigger("application.show",      new ScenesView  ({model: game, collection: storage.scenes, triggers: storage.triggers, intro_scene: intro_scene}));
				vent.trigger("application:nav:show",  new GameNavMenu ({model: game, active: ".scenes"}));
				vent.trigger("application:list:show", new GameObjectsOrganizerView({model: game, dialogs: storage.dialogs, plaques: storage.plaques, items: storage.items, pages: storage.web_pages, factories: storage.factories}));
				vent.trigger("application:info:hide");
			});
		},


		editGame: function(game_id) {
			var game = storage.games.retrieve(game_id);
			storage.for(game);

			$.when(game.fetch(), storage.scenes.fetch()).done(function()
			{
				vent.trigger("application.show",     new GameEditorView ({model: game, scenes: storage.scenes}));
				vent.trigger("application:nav:show", new GameNavMenu    ({model: game, active: ".game"}));
				vent.trigger("application:info:hide");
				vent.trigger("application:list:hide");
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

		editTabs: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.tabs.fetch()).done(function()
			{
				vent.trigger("application.show",     new TabsView    ({model: game, collection: storage.tabs}));
				vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".game"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},

		editTags: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.tags.fetch()).done(function()
			{
				vent.trigger("application.show",     new TagsView    ({model: game, collection: storage.tags}));
				vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".game"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},

		editNotes: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			// TODO should be a search module with pagination?
			var notes = new NotesCollection([], {parent: game});

			$.when(notes.fetch()).done(function()
			{
				vent.trigger("application.show",     new NotesView   ({model: game, collection: notes}));
				vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".notes"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},


		/* List Routes ************************/

		listLocations: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.triggers.fetch(), storage.instances.fetch(), storage.web_pages.fetch(), storage.plaques.fetch(), storage.dialogs.fetch(), storage.items.fetch()).done(function()
			{
				// Just give non-note location triggers to view (until we filtering view is created)
				var location_selection = triggers.filter(function(trigger)
				{
					return trigger.get("type") === "LOCATION" && trigger.instance().get("object_type") !== "NOTE";

				});
				var locations = new GameTriggersCollection(location_selection, {parent: game});

				vent.trigger("application.show",      new LocationsView ({model: game, collection: locations}));
				vent.trigger("application:nav:show",  new GameNavMenu   ({model: game, active: ".locations"}));
				vent.trigger("application:list:show", new LocationsOrganizerView({locations: locations, instances: storage.instances}));
				vent.trigger("application:info:hide");
			});
		},

		listQuests: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.quests.fetch()).done(function()
			{
				vent.trigger("application.show",     new QuestsView  ({model: game, collection: storage.quests}));
				vent.trigger("application:nav:show", new GameNavMenu ({model: game, active: ".quests"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},

		listMedia: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.media.fetch()).done(function()
			{
				vent.trigger("application.show",      new MediaEditorView ({model: game, collection: storage.media}));
				vent.trigger("application:nav:show",  new GameNavMenu     ({model: game, active: ".media"}));
				vent.trigger("application:list:show", new MediaOrganizerView({collection: storage.media}));
				vent.trigger("application:info:hide");
			});
		},

		listConversations: function(game_id) {
			var game  = new Game({game_id: game_id});
			storage.for(game);

			$.when(storage.dialogs.fetch()).done(function()
			{
				vent.trigger("application.show",      new ConversationsView ({model: game, collection: storage.dialogs}));
				vent.trigger("application:nav:show",  new GameNavMenu       ({model: game, active: ".conversations"}));
				vent.trigger("application:list:hide");
				vent.trigger("application:info:hide");
			});
		},
	});
});
