define([
  'models/json_base',
  'storage'
],
function(
  JsonBaseModel,
  storage
)
{
  return JsonBaseModel.extend({
    idAttribute: 'event_id',

    amfphp_url_templates:
    {
      read:   "events.getEvent",
      update: "events.updateEvent",
      create: "events.createEvent",
      delete: "events.deleteEvent"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "event_id",
      "name",
      "event",
      "content_id",
      "qty"
    ],

    defaults:
    {
      "name":"",
      "event": "GIVE_ITEM_PLAYER",
      "content_id": "0",
      "qty": "1"
    },

    initialize: function(attributes)
    {
      // Adapt to incoming legacy values
      if(this.get("event") === "GIVE_ITEM") this.set("event", "GIVE_ITEM_PLAYER");
      if(this.get("event") === "TAKE_ITEM") this.set("event", "TAKE_ITEM_PLAYER");
    },

    /* Inference */
    modified_by: function()
    {
      var object;
      var event_package_id = this.get("event_package_id");

      object = storage.quests.findWhere({active_event_package_id: event_package_id});
      if(object) return object;

      object = storage.quests.findWhere({complete_event_package_id: event_package_id});
      if(object) return object;

      object = storage.plaques.findWhere({event_package_id: event_package_id});
      if(object) return object;

      object = storage.dialog_scripts.findWhere({event_package_id: event_package_id});
      if(object) return object;

      console.error("Can not locate game object with event_package_id: "+event_package_id);
      return null;
    }
  });
});

