/*
  Games Model
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

  self.getMethod        = "games.getGame";
  self.createMethod     = "games.createGame";
  self.updateMethod     = "games.updateGame";
  self.deleteMethod     = "games.deleteGame";
  self.getForGameMethod = ""; //doesn't make sense

  self.defaultObject =
  {
    "game_id":0,
    "name":"Game",
    "description":"",
    "icon_media_id":0,
    "media_id":0,
    "rating":0,
    "published":0,
    "type":"LOCATION",
    "network_level":"REMOTE",
    "intro_scene_id":0,
    "latitude":0,
    "longitude":0,
    "map_type":"STREET",
    "map_latitude":0,
    "map_longitude":0,
    "map_zoom_level":0,
    "map_show_player":0,
    "map_show_players":0,
    "map_offsite_mode":0,
    "notebook_allow_comments":0,
    "notebook_allow_likes":0,
    "notebook_trigger_scene_id":0,
    "notebook_trigger_requirement_root_package_id":0,
    "notebook_trigger_title":"",
    "notebook_trigger_icon_media_id":0,
    "notebook_trigger_distance":0,
    "notebook_trigger_infinite_distance":0,
    "notebook_trigger_wiggle":0,
    "notebook_trigger_show_title":0,
    "notebook_trigger_hidden":0,
    "notebook_trigger_on_enter":0,
    "inventory_weight_cap":0,
    "is_sift":0,
    "siftr_url":"",
    "moderated":0,
  };

  self.idAttribute = "game_id";

  return self;
});

