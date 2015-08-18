/*
  Dialog Options Model
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

  self.getMethod        = "dialogs.getDialogOption";
  self.createMethod     = "dialogs.createDialogOption";
  self.updateMethod     = "dialogs.updateDialogOption";
  self.deleteMethod     = "dialogs.deleteDialogOption";
  self.getForGameMethod = "dialogs.getDialogOptionsForGame";

  self.defaultObject =
  {
    "dialog_option_id":0,
    "game_id":0,
    "dialog_id":0,
    "parent_dialog_script_id":0,
    "prompt":"Option",
    "link_type":"EXIT",
    "link_id":0,
    "link_info":"",
    "requirement_root_package_id":0,
    "sort_index":0,
  };

  self.idAttribute = "dialog_option_id";

  return self;
});

