define([
  'collections/json_collection_base',
  'models/dialog_option',
],
function(
  JsonCollection,
  DialogOption
)
{
  return JsonCollection.extend(
  {
    model: DialogOption,
    amfphp_url: "dialogs.getDialogOptionsForGame"
  });
});

