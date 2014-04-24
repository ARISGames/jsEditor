define([
	'jquery',
	'underscore',
	'backbone',
	'scripts/config.js.php?dummy'
], function($, _, Backbone, config) {
	return Backbone.Model.extend({
		idAttribute: "_id",

		urlRoot: config.mongo_url + "/character_instances",

		defaults: {
			description: "Character Info",
			triggered_by_id: 0
		}

	});
});

