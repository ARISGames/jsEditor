define([
  'collections/json_collection_base',
  'models/trigger'
],
function(
  JsonCollection,
  Trigger
)
{
  return JsonCollection.extend({
    model: Trigger,
    amfphp_url: "triggers.getTriggersForScene"
  });
});

