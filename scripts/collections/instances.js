define([
	'collections/json_collection_base',
	'models/instance'
], function(JsonCollection, Instance) {

	return JsonCollection.extend({

		model: Instance,

		amfphp_url: "instances.getInstancesForGame"
	});
});
