/*
  Triggers Model
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

  self.getMethod        = "triggers.getTrigger";
  self.createMethod     = "triggers.createTrigger";
  self.updateMethod     = "triggers.updateTrigger";
  self.deleteMethod     = "triggers.deleteTrigger";
  self.getForGameMethod = "triggers.getTriggersForGame";

  self.defaultObject =
  {
    "trigger_id":0,
    "game_id":0,
    "instance_id":0,
    "scene_id":0,
    "requirement_root_package_id":0,
    "type":"LOCATION",
    "name":"",
    "title":"",
    "icon_media_id":0,
    "latitude":0,
    "longitude":0,
    "distance":0,
    "infinite_distance":0,
    "wiggle":0,
    "show_title":0,
    "hidden":0,
    "trigger_on_enter":0,
    "qr_code":"",
  };

  self.idAttribute = "trigger_id";

  return self;
});

