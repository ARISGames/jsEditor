/*
  Groups Model
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

  self.getMethod        = "groups.getGroup";
  self.createMethod     = "groups.createGroup";
  self.updateMethod     = "groups.updateGroup";
  self.deleteMethod     = "groups.deleteGroup";
  self.getForGameMethod = "groups.getGroupsForGame";

  self.defaultObject =
  {
    "group_id":0,
    "game_id":0,
    "name":"Group",
    "description":"",
  };

  self.idAttribute = "group_id";

  return self;
});

