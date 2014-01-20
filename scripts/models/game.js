define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	return Backbone.Model.extend({
		idAttribute: 'game_id',

		urlRoot: "http://arisgames.org/server/json.php/v1.games.getGame",

		// attribute order for url here
		
		// sync method for differing urls
		// TODO when does url/urlroot get called for single vs collection

		parse: function(json) {
			if(this.collection == undefined) {
				return json.data;
			}
			else {
				return json;
			}
		}

	});
});
