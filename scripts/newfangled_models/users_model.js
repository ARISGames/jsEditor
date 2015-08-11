/*
  Users Model
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

  self.getMethod        = "users.getUser";
  self.createMethod     = "users.createUser";
  self.updateMethod     = "users.updateUser";
  self.deleteMethod     = "users.deleteUser";
  self.getForGameMethod = "";

  self.defaultObject =
  {
    "user_id":0,
    "user_name":"",
    "display_name":"",
    "group_name":"",
    "transient":0,
    "email":"",
    "media_id":0,
  };

  self.idAttribute = "user_id";

  return self;
});

