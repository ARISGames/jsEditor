define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'plaque_id',

		amfphp_url_templates: {
			read:   "plaques.getPlaque",
			update: "plaques.updatePlaque",
			create: "plaques.createPlaque",
			delete: "plaques.deletePlaque"
		},

		amfphp_url_attributes: [
			"game_id",
			"plaque_id",
			"name",
			"description",
			"media_id",
			"icon_media_id",
		    "event_package_id"
        ],

		defaults: {
			name: "",
			description: "",
			media_id: "0",
			icon_media_id: "0",
			event_package_id: "0"
		}

	});
});

