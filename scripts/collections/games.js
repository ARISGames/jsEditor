define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/game',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Game, JsonCollection, session, vent) {

	return JsonCollection.extend({

		model: Game,

		amfphp_url: "games.getGamesForUser"
	});
});
