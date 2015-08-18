/*
  Media Model
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

  self.getMethod        = "media.getMedia";
  self.createMethod     = "media.createMedia";
  self.updateMethod     = "media.updateMedia";
  self.deleteMethod     = "media.deleteMedia";
  self.getForGameMethod = "media.getMediaForGame";

  self.defaultObject =
  {
    "media_id":0,
    "game_id":0,
    "user_id":0,
    "name":"Media",
    "file_folder":"",
    "file_name":"",
  };

  self.idAttribute = "media_id";

  return self;
});

