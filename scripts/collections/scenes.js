define([
	'jquery',
	'underscore',
	'backbone',
	'models/scene',
	'scripts/config.js.php?dummy',
	'vent'
], function($, _, Backbone, Scene, config, vent) {
	return Backbone.Collection.extend({
		model: Scene,

		url: config.mongo_url
	});
});

