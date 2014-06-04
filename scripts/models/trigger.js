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
			"code"
        ],

		defaults: {
			title: "triggerTitle",
			type: "LOCATION",
			latitude: "-34.397",
			longitude: "150.644",
			distance: "5",
			wiggle: "1",
			show_title: "1",
			code: "abc123",
			requirement_root_package_id: 0
		}

	});
});

