/*
  Events Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'models/aris_model',
],
function(
  aris_model
)
{
  var self = aris_model;

  self.getMethod        = "events.getEvent";
  self.createMethod     = "events.createEvent";
  self.updateMethod     = "events.updateEvent";
  self.deleteMethod     = "events.deleteEvent";
  self.getForGameMethod = "events.getEventsForGame";

  self.defaultObject =
  {
    "event_id":0,
    "game_id":0,
    "name":"Event",
    "event":"GIVE_ITEM_PLAYER",
    "content_id":0,
    "script""",
    "qty":1,
  };

  self.idAttribute = "event_id";

  return self;
});

