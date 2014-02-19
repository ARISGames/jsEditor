define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
], function($, _, Backbone, AmfBaseModel) {

	return AmfBaseModel.extend({
		idAttribute: 'location_id',


		amfphp_url_templates: {
			read:   "locations.getLocation",
			update: "locations.updateLocation",
			create: "locations.createLocation",
			delete: "locations.deleteLocation"
		},

		amfphp_url_attributes: [
			"game_id",
			"location_id",
			"name",
			"icon_media_id",
			"latitude",
			"longitude",
			"error",
			"type",
			"type_id",
			"item_qty",
			"hidden",
			"force_view",
			"allow_quick_travel",
			"wiggle",
			"show_title"
		]
	});
});
