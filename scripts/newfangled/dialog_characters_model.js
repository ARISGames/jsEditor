/*
  Dialog Characters Model
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

  self.getMethod        = "dialogs.getDialogCharacter";
  self.createMethod     = "dialogs.createDialogCharacter";
  self.updateMethod     = "dialogs.updateDialogCharacter";
  self.deleteMethod     = "dialogs.deleteDialogCharacter";
  self.getForGameMethod = "dialogs.getDialogCharactersForGame";

  self.defaultObject =
  {
    "dialog_character_id":0,
    "game_id":0,
    "name":"Character",
    "title":"Character",
    "media_id":0,
  };

  self.idAttribute = "dialog_character_id";

  return self;
});

