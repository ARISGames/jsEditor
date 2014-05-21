define([
	'jquery',
	'underscore',
	'backbone',
	'views/login',
	'views/games',
	'views/scenes',
	'views/game_nav_menu',
	'views/game_item_panel',
	'views/plaques',
	'views/items',
	'views/quests',
	'views/locations',
	'views/requirements',
	'views/conversations',
	'views/media_list',
	'views/upload_media',
	'views/edit_amf_model',
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
	LoginView, GamesView, GameScenesView, GameNavMenu, GameItemPanel, PlaquesView, ItemsView, QuestsView, LocationsView, RequirementsView, ConversationsView, MediaListView, UploadMediaView,
	EditAmfModelView,
	GameCollection, PlaqueCollection, ItemCollection, QuestCollection, LocationCollection, RequirementCollection, ConversationCollection, MediaCollection,SceneCollection,
	Game, Plaque, Item, Quest, Location, Requirement, Conversation, Media,
	vent) {
	return Backbone.Router.extend({

		routes: {
			"": "listGames",
			"login": "showLogin",

			"games":               "listGames",
			"games/new":           "newGame",
			"games/:game_id":      "showGame",
			"games/:game_id/edit": "editGame",

			"games/:game_id/scenes":     "showSceneEditor",

			"games/:game_id/plaques":    "listPlaques",
			"games/:game_id/items":      "listItems",
			"games/:game_id/quests":     "listQuests",
			"games/:game_id/locations":  "listLocations",
			"games/:game_id/media":      "listMedia",

			"games/:game_id/locations/:location_id/requirements":    "listLocationRequirements",
			//"games/:game_id/quests/:quest_id/requirements/display":  "listQuestDisplayRequirements",
			//"games/:game_id/quests/:quest_id/requirements/display":  "listQuestCompleteRequirements",
			"games/:game_id/characters/:character_id/conversations": "listCharacterConversations",


			"games/:game_id/plaques/new":       "newPlaque",
			"games/:game_id/items/new":         "newItem",
			"games/:game_id/quests/new":        "newQuest",
			"games/:game_id/locations/new":     "newLocation",
			"games/:game_id/requirements/new":  "newRequirement",
			"games/:game_id/media/new":         "newMedia",

			"games/:game_id/plaques/:plaque_id/edit":           "editPlaque",
			"games/:game_id/items/:item_id/edit":               "editItem",
			"games/:game_id/quests/:quest_id/edit":             "editQuest",
			"games/:game_id/locations/:location_id/edit":       "editLocation",
			"games/:game_id/requirements/:requirement_id/edit": "editRequirement",

			"games/:game_id/characters/:character_id/conversations/:conversation_id/edit": "editConversation",
			"games/:game_id/characters/:character_id/conversations/new": "newConversation",


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
						data: { "game_id": game.id },
						success: function() {
							vent.trigger("application.show",      new GameScenesView ({model: game, collection: scenes}));
							vent.trigger("application:nav:show",  new GameNavMenu    ({model: game}));
						}
					});
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


		/* List Routes ************************/

		listPlaques: function(game_id) {
			var game    = new Game({game_id: game_id});
			var plaques = new PlaqueCollection([], {parent: game});
			plaques.fetch({
				success: function() {
					vent.trigger("application.show", new PlaquesView({collection: plaques}));
				}
			});
		},

		listItems: function(game_id) {
			var game  = new Game({game_id: game_id});
			var items = new ItemCollection([], {parent: game});
			items.fetch({
				success: function() {
					vent.trigger("application.show", new ItemsView({collection: items}));
				}
			});
		},

		listQuests: function(game_id) {
			var game   = new Game({game_id: game_id});
			var quests = new QuestCollection([], {parent: game});
			quests.fetch({
				success: function() {
					vent.trigger("application.show", new QuestsView({collection: quests}));
				}
			});
		},

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

		listCharacterConversations: function(game_id, character_id) {
			var	character = new Character({game_id: game_id, npc_id: character_id});
			var conversations = new ConversationCollection([], {parent: character});

			conversations.fetch({
				success: function() {
					vent.trigger("application.show", new ConversationsView({collection: conversations}));
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

		editPlaque: function(game_id, plaque_id) {
			var plaque = new Plaque({game_id: game_id, node_id: plaque_id})
			plaque.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: plaque}));
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

		editLocation: function(game_id, character_id, conversation_id) {
			// Triggered from vent because there is no getConversation
		},


		/* New Routes *************************/

		newPlaque: function(game_id) {
			var plaque = new Plaque({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: plaque}));
		},


		newItem: function(game_id) {
			var item = new Item({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: item}));
		},

		newQuest: function(game_id) {
			var quest = new Quest({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: quest}));
		},

		newLocation: function(game_id) {
			var location = new Location({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: location}));
		},

		newRequirement: function(game_id) {
			var requirement = new Requirement({game_id: game_id});
			vent.trigger("application.show", new EditAmfModelView({model: requirement}));
		},

		newConversation: function(game_id, character_id) {
			var conversation = new Conversation({game_id: game_id, npc_id: character_id});
			vent.trigger("application.show", new EditAmfModelView({model: conversation}));
		},

		newMedia: function(game_id) {
			var media = new Media({game_id: game_id});
			vent.trigger("application.show", new UploadMediaView({model: media}));
		},

		newGame: function() {
			var game = new Game();
			vent.trigger("application.show", new EditAmfModelView({model: game}));
		},


		/* Requirement Routes *****************/

		listLocationRequirements: function(game_id, location_id) {
			var location = new Location({game_id: game_id, location_id: location_id});
			var requirements = new RequirementCollection([], {parent: location});

			requirements.fetch({
				success: function() {
					vent.trigger("application.show", new RequirementsView({collection: requirements}));
				}
			});
		},

		editRequirement: function(game_id, requirement_id) {
			var requirement = new Requirement({game_id: game_id, requirement_id: requirement_id})
			requirement.fetch({
				success: function() {
					vent.trigger("application.show", new EditAmfModelView({model: requirement}));
				}
			});
		},

	});
});
