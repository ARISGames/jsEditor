define([
  'jquery',
  'underscore',
  'backbone',
  'views/login',
  'views/games_layout',
  'views/games',
  'views/scenes',
  'views/game_nav_menu',
  'views/locations',
  'views/quests',
  'views/media_editor',
  'views/ar_target_editor',
  'views/edit_json_model',
  'views/game_editor',
  'views/editors',
  'views/game_objects_organizer',
  'views/locations_organizer',
  'views/media_organizer',
  'views/ar_target_organizer',
  'views/conversations',
  'views/tabs',
  'views/groups',
  'views/tags',
  'views/notes',
  'collections/editors',
  'collections/game_triggers',
  'collections/notes',
  'models/game',
  'vent',
  'models/session',
  'util',
  'storage',
],
function(
  $,
  _,
  Backbone,
  LoginView,
  GamesLayoutView,
  GamesView,
  ScenesView,
  GameNavMenu,
  LocationsView,
  QuestsView,
  MediaEditorView,
  ARTargetEditorView,
  EditJsonModelView,
  GameEditorView,
  EditorSharingView,
  GameObjectsOrganizerView,
  LocationsOrganizerView,
  MediaOrganizerView,
  ARTargetOrganizerView,
  ConversationsView,
  TabsView,
  GroupsView,
  TagsView,
  NotesView,
  EditorsCollection,
  GameTriggersCollection,
  NotesCollection,
  Game,
  vent,
  session,
  util,
  storage
)
{
  return Backbone.Router.extend(
  {
    initialize:function()
    {
      this.bind('route', this._pageView);
    },

    // Hash based url tracking
    _pageView: function()
    {
      if(typeof ga != 'undefined')
      {
        var path = Backbone.history.getFragment();
        ga('send', 'pageview', {page: "/" + path})
      }
    },

    preloadStorage: function(game,callback)
    {
      $.when(
        game.fetch(),
        storage.editors.fetch(),
        storage.groups.fetch(),
        storage.tags.fetch(),
        storage.tabs.fetch(),
        storage.quests.fetch(),
        storage.scenes.fetch(),
        storage.ar_targets.fetch(),
        storage.instances.fetch(),
        storage.triggers.fetch(),
        storage.plaques.fetch(),
        storage.items.fetch(),
        storage.dialogs.fetch(),
        storage.dialog_scripts.fetch(),
        storage.dialog_options.fetch(),
        storage.dialog_characters.fetch(),
        storage.web_pages.fetch(),
        storage.event_packages.fetch(),
        storage.factories.fetch(),
        storage.media.fetch()
      ).done(callback);
    },

    routes:
    {
      "": "listGames",
      "login": "showLogin",

      "games":                 "listGames",
      "games/:game_id/edit":   "editGame",
      "games/:game_id/share":  "editSharing",
      "games/:game_id/tabs":   "editTabs",
      "games/:game_id/groups": "editGroups",
      "games/:game_id/tags":   "editTags",
      "games/:game_id/notes":  "editNotes",

      "games/:game_id/scenes":       "showSceneEditor",
      "games/:game_id/locations":    "listLocations",
      "games/:game_id/quests":       "listQuests",
      "games/:game_id/media":        "listMedia",
      "games/:game_id/artargets":    "listARTargets",
      "games/:game_id/conversations":"listConversations",

      "*nomatch": function(url) { throw "Route not found: "+url; },
    },

    showLogin: function()
    {
      vent.trigger("application.show", new LoginView);
    },

    /* Game Routes ************************/

    listGames: function()
    {
      // FIXME hack to prevent clicking the logo going to blank area when database is empty
      if(!session.logged_in()) { return false; }

      var games           = storage.games;

      var games_layout    = new GamesLayoutView();
      var games_view      = new GamesView({collection: games});

      vent.trigger("application.show", games_layout);

      games_layout.games.show(games_view);

      vent.trigger("application:nav:hide" );
      vent.trigger("application:info:hide");
      vent.trigger("application:list:hide");

      // Conditionally add link user fields.
      games.fetch();
    },

    showSceneEditor: function(game_id)
    {
      var game = storage.games.retrieve(game_id);
      storage.for(game);

      // TODO catch errors if any fail (since its a non-standard failure)
      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          // TODO make game a promise and store it so we can access the same game instance in other tabs.
          // then 'intro scene' test can just be if this.model.is(game.intro_scene())
          var intro_scene = storage.scenes.get(game.get("intro_scene_id"));

          vent.trigger("application.show",      new ScenesView  ({ model:game, collection:storage.scenes }));
          vent.trigger("application:nav:show",  new GameNavMenu ({ model:game, active:".scenes" }));
          vent.trigger("application:list:show", new GameObjectsOrganizerView({}));
          vent.trigger("application:info:hide");
        }
      );
    },

    editGame: function(game_id)
    {
      var game = storage.games.retrieve(game_id);
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new GameEditorView ({model:game, scenes:storage.scenes}));
          vent.trigger("application:nav:show", new GameNavMenu    ({model:game, active:".game"}));
          vent.trigger("application:info:hide");
          vent.trigger("application:list:hide");
        }
      );
    },

    editSharing: function(game_id)
    {
      var game = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new EditorSharingView ({model:game, collection:storage.editors}));
          vent.trigger("application:nav:show", new GameNavMenu       ({model:game, active:".game"}));
          vent.trigger("application:info:hide");
          vent.trigger("application:list:hide");
        }
      );
    },

    editTabs: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new TabsView    ({model:game, collection:storage.tabs}));
          vent.trigger("application:nav:show", new GameNavMenu ({model:game, active:".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editGroups: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new GroupsView  ({model:game, collection:storage.groups}));
          vent.trigger("application:nav:show", new GameNavMenu ({model:game, active:".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editTags: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new TagsView    ({model:game, collection:storage.tags}));
          vent.trigger("application:nav:show", new GameNavMenu ({model:game, active:".game"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    editNotes: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      // TODO should be a search module with pagination?
      var notes = new NotesCollection([], {parent:game});

      $.when(
        notes.fetch()).done(
        function()
        {
          vent.trigger("application.show",     new NotesView   ({model:game, collection:notes}));
          vent.trigger("application:nav:show", new GameNavMenu ({model:game, active:".notes"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    /* List Routes ************************/

    listLocations: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          // Just give non-note location triggers to view (until we filtering view is created)
          var location_selection = storage.triggers.filter(function(trigger)
          {
            return trigger.get("type") === "LOCATION" && trigger.instance().get("object_type") !== "NOTE";

          });
          var locations = new GameTriggersCollection(location_selection, {parent:game});

          vent.trigger("application.show",      new LocationsView ({model:game, collection:locations}));
          vent.trigger("application:nav:show",  new GameNavMenu   ({model:game, active:".locations"}));
          vent.trigger("application:list:show", new LocationsOrganizerView({locations:locations, instances:storage.instances}));
          vent.trigger("application:info:hide");
        }
      );
    },

    listQuests: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",     new QuestsView  ({model:game, collection:storage.quests}));
          vent.trigger("application:nav:show", new GameNavMenu ({model:game, active:".quests"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },

    listARTargets: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",      new ARTargetEditorView ({model:game, collection:storage.ar_targets}));
          vent.trigger("application:nav:show",  new GameNavMenu     ({model:game, active:".ar_targets"}));
          vent.trigger("application:list:show", new ARTargetOrganizerView({collection:storage.ar_targets}));
          vent.trigger("application:info:hide");
        }
      );
    },

    listMedia: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",      new MediaEditorView ({model:game, collection:storage.media}));
          vent.trigger("application:nav:show",  new GameNavMenu     ({model:game, active:".media"}));
          vent.trigger("application:list:show", new MediaOrganizerView({collection:storage.media}));
          vent.trigger("application:info:hide");
        }
      );
    },

    listConversations: function(game_id)
    {
      var game  = new Game({game_id:game_id});
      storage.for(game);

      this.preloadStorage(game,
        function()
        {
          //set game loc after we're sure we've loaded game- THISISBAD
          util.game_location = { latitude:parseFloat(game.get("latitude")), longitude:parseFloat(game.get("longitude")) };
          vent.trigger("application.show",      new ConversationsView ({model:game, collection:storage.dialogs}));
          vent.trigger("application:nav:show",  new GameNavMenu       ({model:game, active:".conversations"}));
          vent.trigger("application:list:hide");
          vent.trigger("application:info:hide");
        }
      );
    },
  });
});

