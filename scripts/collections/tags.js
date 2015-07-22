define([
  'collections/json_collection_base',
  'models/tag'
],
function(
  JsonCollection,
  Tag
)
{
  return JsonCollection.extend({
    model: Tag,
    amfphp_url: "tags.getTagsForGame"
  });
});

