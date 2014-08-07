define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'dialog_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialog",
			update: "dialogs.updateDialog",
			create: "dialogs.createDialog",
			delete: "dialogs.deleteDialog"
		},

		amfphp_url_attributes: [
			"game_id",
			"dialog_id",
			"name",
			"description",
			"icon_media_id",
			"opening_script_id"
        ],

		defaults: {
			name: "",
			description: "",
			icon_media_id: "0",
			opening_script_id: "0"
		}

	});
});

