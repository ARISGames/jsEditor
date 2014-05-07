define([
	'jquery',
	'underscore',
	'backbone',
	'scripts/config.js.php?dummy',
	'vent'
], function($, _, Backbone, config, vent) {
	return Backbone.Collection.extend({

		initialize: function(models, options) {
			options || (options = {});
			this.parent = options.parent;
		},

		amfphp_url_root: config.aris_api_url,

		parse: function(json, response) {
			return json.data;
		},

	});
});

