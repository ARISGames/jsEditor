define([
	'jquery',
	'underscore',
	'backbone',
	'scripts/config.js.php?dummy'
], function($, _, Backbone, config) {
	return Backbone.Model.extend({
		idAttribute: "_id",

		urlRoot: config.mongo_url + "/characters",

		defaults: {
			name: "New Character"
		}

	});
});

