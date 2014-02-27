define([
	'jquery',
	'underscore',
	'backbone',
	'vent'
], function($, _, Backbone, vent) {
	return Backbone.Collection.extend({

		initialize: function(models, options) {
			options || (options = {});
			this.parent = options.parent;
		},

		amfphp_url_root: 'https://arisgames.org/server/json.php/v1.',

		parse: function(json, response) {
			return json.data;
		},

	});
});

