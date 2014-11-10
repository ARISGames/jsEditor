define([
	'collections/json_collection_base',
	'models/game_list_game'
], function(JsonCollection, GameListGame) {

	return JsonCollection.extend({

		model: GameListGame,

		amfphp_url: "games.getGamesForUser"
	});
});
