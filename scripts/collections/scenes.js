define([
  'collections/json_collection_base',
  'models/scene'
],
function(
  JsonCollection,
  Scene
)
{
  return JsonCollection.extend(
  {
    model: Scene,
    amfphp_url: "scenes.getScenesForGame"
  });
});
