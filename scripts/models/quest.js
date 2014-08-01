define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'quest_id',

		amfphp_url_templates: {
			read:   "quests.getQuest",
			update: "quests.updateQuest",
			create: "quests.createQuest",
			delete: "quests.deleteQuest"
		},

		amfphp_url_attributes: [
			"game_id",
			"quest_id",
			"name",
			"description",

			"active_icon_media_id",
			"active_media_id",
			"active_description",
			"active_notification_type",
			"active_function",
			"active_event_package_id",
			"active_requirement_root_package_id",

			"complete_icon_media_id",
			"complete_media_id",
			"complete_description",
			"complete_notification_type",
			"complete_function",
			"complete_event_package_id",
			"complete_requirement_root_package_id",
        ],

		defaults: {
			description: "",

			active_description: "",
			active_icon_media_id: "0",
			active_media_id: "0",
			active_notification_type: "NONE",
			active_function: "NONE",
			active_event_package_id: "0",
			active_requirement_root_package_id: "0",


			complete_description: "",
			complete_icon_media_id: "0",
			complete_media_id: "0",
			complete_notification_type: "NONE",
			complete_function: "NONE",
			complete_event_package_id: "0",
			complete_requirement_root_package_id: "0"
		}

	});
});

