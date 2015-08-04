define([
  'models/json_base'
],
function(
  JsonBaseModel
)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'event_package_id',

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
      "events" // Nested attribute
    ],

    defaults:
    {
      name:"",
      icon_media_id:0,
      events:[]
    }
  });
});

