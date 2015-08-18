/*
  Instances Model
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

  self.getMethod        = "instances.getInstance";
  self.createMethod     = "instances.createInstance";
  self.updateMethod     = "instances.updateInstance";
  self.deleteMethod     = "instances.deleteInstance";
  self.getForGameMethod = "instances.getInstancesForGame";

  self.defaultObject =
  {
    "instance_id":0,
    "game_id":0,
    "object_type":"NONE",
    "object_id":0,
    "qty":0,
    "infinite_qty":0,
    "factory_id":0,
    "owner_type":"GAME",
    "owner_id":0,
  };

  self.idAttribute = "instance_id";

  return self;
});

