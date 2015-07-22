define([
  'collections/json_collection_base',
  'models/game'
],
function(
  JsonCollection,
  Game
)
{
  return JsonCollection.extend({
    model: Game,
    amfphp_url: "games.getGamesForUser"
  });
});

