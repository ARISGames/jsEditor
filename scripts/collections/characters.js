define([
	'collections/json_collection_base',
	'models/character',
	'vent'
], function(JsonCollection, Character) {

	return JsonCollection.extend({

		model: Character,

		amfphp_url: "npcs.getNpcsForGame"
	});
});
