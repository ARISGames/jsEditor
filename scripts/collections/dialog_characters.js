define([
  'collections/json_collection_base',
  'models/dialog_character',
  'vent',
],
function(
  JsonCollection,
  DialogCharacter,
  vent
)
{
  return JsonCollection.extend(
  {
    model: DialogCharacter,
    amfphp_url:"dialogs.getDialogCharactersForGame"
  });
});

