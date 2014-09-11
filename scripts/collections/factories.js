define([
	'collections/json_collection_base',
	'models/factory',
	'vent'
], function(JsonCollection, Factory) {

	return JsonCollection.extend({

		model: Factory,

		amfphp_url: "factories.getFactoriesForGame"
	});
});
