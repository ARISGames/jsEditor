/*
  Plaques Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'models/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "plaques.getPlaque";
  self.createMethod     = "plaques.createPlaque";
  self.updateMethod     = "plaques.updatePlaque";
  self.deleteMethod     = "plaques.deletePlaque";
  self.getForGameMethod = "plaques.getPlaquesForGame";

  self.defaultObject =
  {
    "plaque_id":0,
    "game_id":0,
    "name":"Plaque",
    "description":"",
    "icon_media_id":0,
    "media_id":0,
    "event_package_id":0,
    "back_button_enabled":0,
  };

  self.idAttribute = "plaque_id";

  return self;
});

