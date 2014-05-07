define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/scene',
	'collections/json_collection_base',
	'scripts/config.js.php?dummy',
	'vent'
], function(module, $, _, Backbone, Scene, JsonCollection, config, vent) {
	console.log(module.id);

	return JsonCollection.extend({

		model: Scene,

		url: config.mongo_url + "/scenes"
	});
});

