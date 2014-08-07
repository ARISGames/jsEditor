define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'character_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialogCharacter",
			update: "dialogs.updateDialogCharacter",
			create: "dialogs.createDialogCharacter",
			delete: "dialogs.deleteDialogCharacter"
		},

		amfphp_url_attributes: [
			"game_id",
			"character_id",
			"name",
			"title",
			"media_id"
        ],

		defaults: {
			name: "",
			title: "",
			media_id: "0"
		}

	});
});

