define([
	'collections/json_collection_base',
	'models/atom',
	'vent'
], function(JsonCollection, Atom) {

	return JsonCollection.extend({

		model: Atom
	});
});
