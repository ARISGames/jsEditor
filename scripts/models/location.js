define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({
		idAttribute: 'location_id'
	});
});
