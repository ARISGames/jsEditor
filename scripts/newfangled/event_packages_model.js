/*
  Event Packages Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'newfangled/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "events.getEventPackage";
  self.createMethod     = "events.createEventPackage";
  self.updateMethod     = "events.updateEventPackage";
  self.deleteMethod     = "events.deleteEventPackage";
  self.getForGameMethod = "events.getEventPackagesForGame";

  self.defaultObject =
  {
    "event_package_id":0,
    "game_id":0,
    "name":"Event Package",
  };

  self.idAttribute = "event_package_id";

  return self;
});

