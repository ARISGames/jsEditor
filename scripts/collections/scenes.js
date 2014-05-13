define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'models/scene',
	'collections/json_collection_base',
	'models/session',
	'vent'
], function(module, $, _, Backbone, Scene, JsonCollection, session, vent) {
	console.log(module.id);

	return JsonCollection.extend({

		model: Scene,

		amfphp_url: "scenes.getScenesForGame"
	});
});

