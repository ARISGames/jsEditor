define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'dialog_script_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialogCharacter",
			update: "dialogs.updateDialogCharacter",
			create: "dialogs.createDialogCharacter",
			delete: "dialogs.deleteDialogCharacter"
		},

		amfphp_url_attributes: [
			"game_id",
			"dialog_script_id",
			"dialog_id",
			"dialog_character_id",
			"text",
			"event_package_id"
        ],

		defaults: {
			text: "",
			dialog_character_id: "0",
			event_package_id: "0"
		}

	});
});

