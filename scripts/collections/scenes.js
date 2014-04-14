define([
	'jquery',
	'underscore',
	'backbone',
	'models/scene',
	'vent'
], function($, _, Backbone, Scene, vent) {
	return Backbone.Collection.extend({
		model: Scene,

		url: "http://localhost:2600/scenes"
	});
});

