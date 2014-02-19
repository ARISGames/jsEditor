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
			update: "locations.updateLocationWithQrCode",
			create: "locations.createLocationWithQrCode",
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
			"show_title",
			"code",
			"match_media_id",
			"fail_text"
		],

		defaults: {
			name: "",
			icon_media_id: 0,
			latitude: 43.07,
			longitude: -89.40,
			error: 30,
			type: "",
			type_id: "",
			item_qty: 1,
			hidden: "",
			force_view: "",
			allow_quick_travel: 0,
			wiggle: 0,
			show_title: 0,
			code: 1234,
			match_media_id: 0,
			fail_text: ""
		}
	});
});
