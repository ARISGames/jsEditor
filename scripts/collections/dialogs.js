define([
  'collections/json_collection_base',
  'models/dialog',
  'vent'
],
function(
  JsonCollection,
  Dialog
)
{
  return JsonCollection.extend(
  {
    model: Dialog,
    amfphp_url: "dialogs.getDialogsForGame",
    comparator: function(o) { return o.get("name").toLowerCase(); },
  });
});

