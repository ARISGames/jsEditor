define([
	'jquery',
	'underscore',
	'backbone',
	'models/character_instance',
	'config',
	'vent'
], function($, _, Backbone, CharacterInstance, config, vent) {
	return Backbone.Collection.extend({
		model: CharacterInstance,

		url: config.mongo_url + "/character_instances"
	});
});

