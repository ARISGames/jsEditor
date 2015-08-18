/*
  Factories Model
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

  self.getMethod        = "factories.getFactory";
  self.createMethod     = "factories.createFactory";
  self.updateMethod     = "factories.updateFactory";
  self.deleteMethod     = "factories.deleteFactory";
  self.getForGameMethod = "factories.getFactoriesForGame";

  self.defaultObject =
  {
    "factory_id":0,
    "game_id":0,
    "name":"Factory",
    "description":"",
    "object_type":"PLAQUE",
    "object_id":0,
    "seconds_per_production":0,
    "production_probability":0,
    "max_production":0,
    "produce_expiration_time":0,
    "produce_expire_on_view":0,
    "production_bound_type":"PER_PLAYER",
    "location_bound_type":"PLAYER",
    "min_production_distance":0,
    "max_production_distance":0,
    "requirement_root_package_id":0,
    "trigger_latitude":0,
    "trigger_longitude":0,
    "trigger_distance":0,
    "trigger_infinite_distance":0,
    "trigger_on_enter":0,
    "trigger_hidden":0,
    "trigger_wiggle":0,
    "trigger_title":0,
    "trigger_icon_media_id":0,
    "trigger_show_title":0,
    "trigger_requirement_root_package_id":0,
    "trigger_scene_id":0,
  };

  self.idAttribute = "factory_id";

  return self;
});

