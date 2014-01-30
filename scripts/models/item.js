define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/session'
], function($, _, Backbone, AmfBaseModel, Session) {

	return AmfBaseModel.extend({
		idAttribute: 'item_id'
	});
});
