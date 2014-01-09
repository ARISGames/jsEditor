define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function($, _, Backbone, Marionette) {
	var Application = Backbone.View.extend({
		initialize: function() {
			console.log("basic app running");
		}
	});

	return Application;
});
