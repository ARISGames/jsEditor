define([
  'collections/json_collection_base',
  'models/plaque',
  'vent'
],
function(
  JsonCollection,
  Plaque
)
{
  return JsonCollection.extend(
  {
    model: Plaque,
    amfphp_url: "plaques.getPlaquesForGame",
    comparator: function(o) { return o.get("name").toLowerCase(); },
  });
});

