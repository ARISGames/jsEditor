/* Storage Singleton */
/* The containers are injected from application.js to fix circular issues */
define([
  "backbone",
  "marionette",
  "util",
],
function(
  Backbone,
  Marionette,
  util
)
{
  var Storage = Marionette.Controller.extend(
  {
    for: function(game)
    {
      var self = this;
      self.users.parent             = game;
      self.editors.parent           = game;
      self.groups.parent            = game;
      self.tags.parent              = game;
      self.tabs.parent              = game;
      self.quests.parent            = game;
      self.media.parent             = game;
      self.scenes.parent            = game;
      self.instances.parent         = game;
      self.triggers.parent          = game;
      self.plaques.parent           = game;
      self.items.parent             = game;
      self.dialogs.parent           = game;
      self.dialog_scripts.parent    = game;
      self.dialog_options.parent    = game;
      self.dialog_characters.parent = game;
      self.web_pages.parent         = game;
      self.event_packages.parent    = game;
      self.factories.parent         = game;

      self.games.add(game);
      self.game = game;
      util.game_location = { latitude:game.get("latitude"), longitude:game.get("longitude") };
    },

    // Add into proper storage
    add_game_object: function(game_object)
    {
      var self = this;
      var idAttribute = game_object.idAttribute;

      // These should call retrieve, just in case.
           if(idAttribute === "user_id")             { self.users.add(game_object);   }
      else if(idAttribute === "user_id")             { self.editors.add(game_object); }
      else if(idAttribute === "group_id")            { self.groups.add(game_object);  }
      else if(idAttribute === "tag_id")              { self.tags.add(game_object);    }
      else if(idAttribute === "tab_id")              { self.tabs.add(game_object);    }
      else if(idAttribute === "quest_id")            { self.quests.add(game_object);  }
      else if(idAttribute === "media_id")            { self.medias.add(game_object);  }
      else if(idAttribute === "scene_id")            { self.scenes.add(game_object);         }
      else if(idAttribute === "instance_id")         { self.instances.add(game_object);      }
      else if(idAttribute === "trigger_id")          { self.triggers.add(game_object);       }
      else if(idAttribute === "plaque_id")           { self.plaques.add(game_object);        }
      else if(idAttribute === "item_id")             { self.items.add(game_object);          }
      else if(idAttribute === "dialog_id")           { self.dialogs.add(game_object);        }
      else if(idAttribute === "dialog_script_id")    { self.dialog_scripts.add(game_object); }
      else if(idAttribute === "dialog_option_id")    { self.dialog_options.add(game_object); }
      else if(idAttribute === "dialog_character_id") { self.dialog_characters.add(game_object); }
      else if(idAttribute === "web_page_id")         { self.web_pages.add(game_object);      }
      else if(idAttribute === "event_package_id")    { self.event_packages.add(game_object); }
      else if(idAttribute === "factory_id")          { self.factories.add(game_object);      }

      else { throw "don't know where to store object of type " + game_object.idAttribute + ": " + game_object.id; }
    },

    // Retrieve based on id and aris type
    retrieve_with_type: function(id, type)
    {
      var self = this;

      if(type === "PLAQUE")           { return self.plaques.retrieve(id);        }
      if(type === "ITEM")             { return self.items.retrieve(id);          }
      if(type === "DIALOG")           { return self.dialogs.retrieve(id);        }
      if(type === "DIALOG_SCRIPT")    { return self.dialog_scripts.retrieve(id); }
      if(type === "DIALOG_OPTION")    { return self.dialog_options.retrieve(id); }
      if(type === "DIALOG_CHARACTER") { return self.dialog_characters.retrieve(id); }
      if(type === "WEB_PAGE")         { return self.web_pages.retrieve(id);      }
      if(type === "SCENE")            { return self.scenes.retrieve(id);         }
      if(type === "FACTORY")          { return self.factories.retrieve(id);      }
      if(type === "EVENT_PACKAGE")    { return self.event_packages.retrieve(id); }

      else { throw "cant fetch game object of type: " + type; }
    }

  });

  return new Storage();
});

