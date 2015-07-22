define([
  'collections/json_collection_base',
  'models/tab'
],
function(
  JsonCollection,
  Tab
)
{
  return JsonCollection.extend({
    model: Tab,
    amfphp_url: "tabs.getTabsForGame"
  });
});

