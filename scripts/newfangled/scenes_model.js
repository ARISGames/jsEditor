/*
  Scenes Model
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

  self.getMethod        = "scenes.getScene";
  self.createMethod     = "scenes.createScene";
  self.updateMethod     = "scenes.updateScene";
  self.deleteMethod     = "scenes.deleteScene";
  self.getForGameMethod = "scenes.getScenesForGame";

  self.defaultObject =
  {
    "scene_id":0,
    "game_id":0,
    "name":"Scene",
    "description":"",
    "editor_x":0,
    "editor_y":0,
  };

  self.idAttribute = "scene_id";

  return self;
});

