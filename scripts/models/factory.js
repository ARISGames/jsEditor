define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'factory_id',

		amfphp_url_templates: {
			read:   "factories.getFactory",
			update: "factories.updateFactory",
			create: "factories.createFactory",
			delete: "factories.deleteFactory"
		},

		amfphp_url_attributes: [
			"game_id",
			"factory_id",
			"name",
			"description",
			"object_type",
			"object_id",
			"seconds_per_production",
			"production_probability",
			"max_production",
			"produce_expiration_time",
			"produce_expire_on_view",
			"production_bound_type",
			"location_bound_type",
			"min_production_distance",
			"max_production_distance",
			"trigger_latitude",
			"trigger_longitude",
			"trigger_distance",
			"trigger_on_enter",
			"trigger_hidden",
			"trigger_wiggle",
			"trigger_title",
			"trigger_icon_media_id",
			"trigger_show_title",
			"trigger_requirement_root_package_id"
        ],

		defaults: {
			name: "",
			description: "",
			object_type: "ITEM",
			object_id: "0",
			seconds_per_production: "10",
			production_probability: "0.5",
			max_production: "100",
			produce_expiration_time: "20",
			produce_expire_on_view: "1",
			production_bound_type: "PER_PLAYER", // TOTAL
			location_bound_type: "PLAYER", // LOCATION
			min_production_distance: "5",
			max_production_distance: "10",

			trigger_latitude: "0.0",
			trigger_longitude: "0.0",

			trigger_distance: "25",
			trigger_infinite_distance: "0",
			trigger_on_enter: "0",
			trigger_hidden: "0",
			trigger_wiggle: "0",
			trigger_title: "",
			trigger_icon_media_id: "0",
			trigger_show_title: "1",
			trigger_requirement_root_package_id: "0"
		}

	});
});

