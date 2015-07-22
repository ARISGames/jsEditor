/* Storage Singleton */

/* The containers are injected from application.js to fix circular issues */
define(
function(require, exports, module)
{
  var Backbone   = require("backbone"  );
  var Marionette = require("marionette");

  var Storage = Marionette.Controller.extend(
  {
    for: function(game)
    {
      this.users.parent     = game;
      this.tags.parent      = game;
      this.tabs.parent      = game;
      this.quests.parent    = game;
      this.media.parent     = game;
      this.web_hooks.parent = game;

      this.instances.parent = game;
      this.triggers.parent  = game;
      this.scenes.parent    = game;

      this.web_pages.parent = game;
      this.dialogs.parent   = game;
      this.plaques.parent   = game;
      this.items.parent     = game;
      this.factories.parent = game;

      this.dialog_scripts.parent = game;

      this.events.parent = game;

      this.games.add(game);
    },

    // Add into proper storage
    add_game_object: function(game_object)
    {
      var idAttribute = game_object.idAttribute;

      // These should call retrieve, just in case.
           if(idAttribute === "dialog_id")   { this.dialogs.add(game_object)   }
      else if(idAttribute === "plaque_id")   { this.plaques.add(game_object)   }
      else if(idAttribute === "item_id")     { this.items.add(game_object)     }
      else if(idAttribute === "web_page_id") { this.web_pages.add(game_object) }
      else if(idAttribute === "scene_id")    { this.scenes.add(game_object)    }
      else if(idAttribute === "factory_id")  { this.factories.add(game_object) }

      else if(idAttribute === "instance_id") { this.instances.add(game_object) }
      else if(idAttribute === "trigger_id")  { this.triggers.add(game_object)  }

      else { throw "don't know where to store object of type " + game_object.idAttribute + ": " + game_object.id; }
    },

    // Retrieve based on id and aris type
    retrieve_with_type: function(id, type)
    {
      if(type === "DIALOG")   { return this.dialogs.retrieve(id)   }
      if(type === "PLAQUE")   { return this.plaques.retrieve(id)   }
      if(type === "ITEM")     { return this.items.retrieve(id)     }
      if(type === "WEB_PAGE") { return this.web_pages.retrieve(id) }
      if(type === "SCENE")    { return this.scenes.retrieve(id)    }
      if(type === "FACTORY")  { return this.factories.retrieve(id) }

      else { throw "cant fetch game object of type: " + type }
    }
  });

  return new Storage();
});

