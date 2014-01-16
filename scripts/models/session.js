define([
	'jquery',
	'underscore',
	'backbone',
	'cookie',
], function($, _, Backbone, Cookie) {

	return Backbone.Model.extend({
		logged_in: function() {
			return false;
		}
	});
});
