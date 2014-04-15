define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
	return Backbone.Model.extend({
		idAttribute: "_id",

		defaults: {
			title: "New Scene"
		}

	});
});

