define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {
	return Backbone.Model.extend({
		idAttribute: "_id",

		defaults: {
			description: "Character Info",
			triggered_by_id: 0
		}

	});
});

