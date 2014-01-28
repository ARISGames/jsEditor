define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({
		idAttribute: 'npc_id'
	});
});
