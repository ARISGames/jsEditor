/*
  Dialogs Model
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

  self.getMethod        = "dialogs.getDialog";
  self.createMethod     = "dialogs.createDialog";
  self.updateMethod     = "dialogs.updateDialog";
  self.deleteMethod     = "dialogs.deleteDialog";
  self.getForGameMethod = "dialogs.getDialogsForGame";

  self.defaultObject =
  {
    "dialog_id":0,
    "game_id":0,
    "name":"Dialog",
    "description":"",
    "icon_media_id":0,
    "intro_dialog_script_id":0,
    "back_button_enabled":0,
  };

  self.idAttribute = "dialog_id";

  return self;
});

