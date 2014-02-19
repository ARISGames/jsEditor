define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
], function($, _, Backbone, AmfBaseModel) {

	return AmfBaseModel.extend({
		idAttribute: 'quest_id',


		amfphp_url_templates: {
			read:   "quests.getQuest",
			update: "quests.updateQuest",
			create: "quests.createQuest",
			delete: "quests.deleteQuest"
		},


		amfphp_url_attributes: function()
		{
			if(this.isNew())
			{
				return [
					"game_id",
					"quest_id",
					"name",
					"sort_index"
				];	
			}
			else
			{
				return [
					"game_id",
					"quest_id",
					"name",
					"description",
					"text_when_complete",
					"description_notification",
					"text_when_complete_notification",
					"active_media_id",
					"complete_media_id",
					"active_icon_media_id",
					"complete_icon_media_id",
					"go_function",
					"complete_go_function",
					"notif_go_function",
					"complete_notif_go_function",
					"full_screen_notify",
					"complete_full_screen_notify",
					"active_notif_show_dismiss",
					"complete_notif_show_dismiss",
					"sort_index"
				];
			}
		},

		defaults: {
			active_icon_media_id: 0,
			active_media_id: 0,
			active_notif_show_dismiss: 1,
			active_notification_media_id: 0,
			complete_full_screen_notify: 1,
			complete_go_function: "NONE",
			complete_icon_media_id: 0,
			complete_media_id: 0,
			complete_notif_go_function: "NONE",
			complete_notif_show_dismiss: "1",
			complete_notification_media_id: 0,
			description: "",
			description_notification: "",
			full_screen_notify: 1,
			go_function: "NONE",
			name: "New Quest",
			notif_go_function: "NONE",
			sort_index: 0,
			text_when_complete: "",
			text_when_complete_notification: ""
		}
	});
});
