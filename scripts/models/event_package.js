define([
  'models/json_base',
  'storage',
],
function(
  JsonBaseModel,
  storage
)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'event_package_id',

    type_name: 'EventPackage',

    amfphp_url_templates:
    {
      read:   "events.getEventPackage",
      update: "events.updateEventPackage",
      create: "events.createEventPackage",
      delete: "events.deleteEventPackage"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "event_package_id",
      "name",
      "icon_media_id",
      "events", // Nested attribute
    ],

    defaults:
    {
      name:"Event",
      icon_media_id:0,
      events:[],
    },

    /* Associations */
    icon:  function() { return storage.media.retrieve(this.get('icon_media_id')); },
    default_icon: function() { return storage.media.retrieve('0'); },

    /* Helpers */
    icon_thumbnail: function() { return this.icon().thumbnail_for(this); },

  });
});

