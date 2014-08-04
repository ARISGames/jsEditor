define([
	'collections/json_collection_base',
	'models/and_package',
	'vent'
], function(JsonCollection, AndPackage) {

	return JsonCollection.extend({

		model: AndPackage
	});
});
