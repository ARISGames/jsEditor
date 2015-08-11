define([
  'collections/json_collection_base',
  'models/group'
],
function(
  JsonCollection,
  Group
)
{
  return JsonCollection.extend(
  {
    model: Group,
    amfphp_url: "groups.getGroupsForGame"
  });
});

