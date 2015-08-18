define([
  'models/json_base',
  'newfangled/dialogs_model',
  'models/plaque',
  'models/item',
  'models/web_page',
  'models/scene',
  'models/factory',
  'models/event_package',
  'storage'
],
function(
  JsonBaseModel,
  DialogModel,
  Plaque,
  Item,
  WebPage,
  Scene,
  Factory,
  EventPackage,
  storage
)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'instance_id',

    amfphp_url_templates:
    {
      read:   "instances.getInstance",
      update: "instances.updateInstance",
      create: "instances.createInstance",
      delete: "instances.deleteInstance"
    },

    amfphp_url_attributes:
    [
      "instance_id",
      "game_id",
      "object_id",
      "object_type",
      "qty",
      "infinite_qty"
    ],

    defaults:
    {
      "qty": "1",
      "infinite_qty": "1"
    },

    object_class: function()
    {
      var type = this.get("object_type");

      if(type === "DIALOG")        { return DialogModel  }
      if(type === "PLAQUE")        { return Plaque       }
      if(type === "ITEM")          { return Item         }
      if(type === "WEB_PAGE")      { return WebPage      }
      if(type === "SCENE")         { return Scene        }
      if(type === "FACTORY")       { return Factory      }
      if(type === "EVENT_PACKAGE") { return EventPackage }
      throw "cant determine class of: " + type
    },

    game_object: function()
    {
      var type = this.get("object_type");
      var id   = this.get("object_id");

      return storage.retrieve_with_type(id, type);
    }
  },

  // Static methods
  {
    type_for: function(object)
    {
      if(object instanceof DialogModel)  { return "DIALOG"         }
      if(object instanceof Item)         { return "ITEM"           }
      if(object instanceof Plaque)       { return "PLAQUE"         }
      if(object instanceof WebPage)      { return "WEB_PAGE"       }
      if(object instanceof Scene)        { return "SCENE"          }
      if(object instanceof Factory)      { return "FACTORY"        }
      if(object instanceof EventPackage) { return "EVENT_PACKAGE"  }

      else { throw "cant determine type of " + object.idAttribute + ": " + object.id; }
    }
  });
});

