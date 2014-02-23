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
			var header = json.data.columns;
			var rows   = json.data.rows;

			var objects = _.map(rows, function(row) {
				var object = {};

				_.each(row, function(attribute, index) {
					object[header[index]] = attribute;
				});

				return object;
			});

			return objects;
		},

	});
});
