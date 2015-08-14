define([
  'collections/json_collection_base',
  'models/dialog_character',
],
function(
  JsonCollection,
  DialogCharacter
)
{
  return JsonCollection.extend(
  {
    model: DialogCharacter,
    amfphp_url: "dialogs.getDialogCharactersForGame"
  });
});

