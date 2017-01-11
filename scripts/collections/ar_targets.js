define([
  'collections/json_collection_base',
  'models/ar_target',
  'vent'
],
function(
  JsonCollection,
  ARTarget
)
{
  return JsonCollection.extend(
  {
    model: ARTarget,
    amfphp_url: "ar_targets.getARTargetsForGame",
    comparator: function(o) { return o.get("vuforia_index").toLowerCase(); },
  });
});

