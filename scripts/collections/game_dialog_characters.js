define([
  'collections/json_collection_base',
  'models/character',
  'vent'
],
function(
  JsonCollection,
  DialogCharacter) {
  return JsonCollection.extend({
    model: DialogCharacter,
    amfphp_url: "dialogs.getDialogCharactersForGame"
  });
});
