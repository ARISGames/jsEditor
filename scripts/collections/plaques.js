define([
	'jquery',
	'underscore',
	'backbone',
	'models/plaque',
	'models/session',
	'vent'
], function($, _, Backbone, Plaque, Session, vent) {
	return Backbone.Collection.extend({

		model: Plaque,

		initialize: function(models, options) {
			this.parent = options.parent;
		},


		url: function() {
			return "http://arisgames.org/server/json.php/v1.nodes.getNodes/"+this.parent.get('game_id');
		},


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
