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
			"wiggle",
			"show_title",
			"hidden",
			"trigger_on_enter",
			"code",
			"icon_media_id"
        ],

		defaults: {
			title: "triggerTitle",
			type: "LOCATION",
			latitude: "43.073",
			longitude: "-89.4012",
			distance: "5",
			wiggle: "0",
			show_title: "1",
			hidden: "0",
			trigger_on_enter: "0",
			code: "abc123",
			requirement_root_package_id: "0",
			icon_media_id: "0"
		}

	});
});

