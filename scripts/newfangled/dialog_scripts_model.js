/*
  Dialog Scripts Model
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

  self.getMethod        = "dialogs.getDialogScript";
  self.createMethod     = "dialogs.createDialogScript";
  self.updateMethod     = "dialogs.updateDialogScript";
  self.deleteMethod     = "dialogs.deleteDialogScript";
  self.getForGameMethod = "dialogs.getDialogScriptsForGame";

  self.defaultObject =
  {
    "dialog_script_id":0,
    "game_id":0,
    "dialog_id":0,
    "dialog_character_id":0,
    "text":"",
    "event_package_id":0,
  };

  self.idAttribute = "dialog_script_id";

  return self;
});

