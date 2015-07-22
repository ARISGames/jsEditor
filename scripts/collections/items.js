define([
  'collections/json_collection_base',
  'models/item',
  'vent'
],
function(
  JsonCollection,
  Item
)
{
  return JsonCollection.extend({
    model: Item,
    amfphp_url: "items.getItemsForGame"
  });
});

