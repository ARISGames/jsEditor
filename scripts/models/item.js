define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({
		idAttribute: 'item_id'
	});
});
