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
      "events" // Nested attribute
    ],

    defaults:
    {
      name:"",
      events:[]
    }
  });
});

