define([
  'collections/json_collection_base',
  'models/event_package',
  'vent'
],
function(
  JsonCollection,
  EventPackage
)
{
  return JsonCollection.extend({
    model: EventPackage,
    amfphp_url: "events.getEventPackagesForGame"
  });
});

