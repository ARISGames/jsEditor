define([
	'models/json_base',
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'trigger_id',

		amfphp_url_templates: {
			read:   "triggers.getTrigger",
			update: "triggers.updateTrigger",
			create: "triggers.createTrigger",
			delete: "triggers.deleteTrigger"
		},

		amfphp_url_attributes: [
			"game_id",
			"trigger_id",
			"instance_id",
			"scene_id",
			"title",
			"requirement_root_package_id",
			"type",
			"latitude",
			"longitude",
			"distance",
			"infinite_distance",
			"wiggle",
			"show_title",
			"hidden",
			"trigger_on_enter",
			"qr_code",
			"icon_media_id"
        ],

		defaults: function() {
			return {
				title: "triggerTitle",
				type: "LOCATION",
				latitude: "43.073",
				longitude: "-89.4012",
				distance: "25",
				infinite_distance: "0",
				wiggle: "0",
				show_title: "1",
				hidden: "0",
				trigger_on_enter: "0",
				qr_code: new Date().getTime(),
				requirement_root_package_id: "0",
				icon_media_id: "0"
			}
		}

	},
	// Static methods
	{
		title_for: function(game_object) {
			return game_object.get("name");
		}
	});
});

