define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/game_character',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Character, JsonCollection, session, vent) {

	return JsonCollection.extend({

		model: Character,

		amfphp_url: "npcs.getNpcsForGame"
	});
});
