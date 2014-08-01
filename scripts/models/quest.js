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
			"name"
        ],

		defaults: {
		}

	});
});

