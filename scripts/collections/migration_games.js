define([
	'collections/json_collection_base',
	'models/migration_game',
	'config'
], function(JsonCollection, MigrationGame, config) {

	return JsonCollection.extend({

		model: MigrationGame,

		amfphp_url_root: config.migration_api_url,
		amfphp_url: "migrate.v1GamesForV2User"
	});
});
