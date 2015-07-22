define([
  'collections/json_collection_base',
  'models/quest',
  'vent'
],
function(
  JsonCollection,
  Quest
)
{
  return JsonCollection.extend({
    model: Quest,
    amfphp_url: "quests.getQuestsForGame"
  });
});

