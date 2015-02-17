define([
	'collections/json_collection_base',
	'models/migration_game'
], function(JsonCollection, MigrationGame) {

	return JsonCollection.extend({

		model: MigrationGame,

		amfphp_url: "migrate.v1GamesForV2User"
	});
});
