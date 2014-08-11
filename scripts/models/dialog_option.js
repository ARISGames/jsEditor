define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'dialog_option_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialogCharacter",
			update: "dialogs.updateDialogCharacter",
			create: "dialogs.createDialogCharacter",
			delete: "dialogs.deleteDialogCharacter"
		},

		amfphp_url_attributes: [
			"game_id",
			"dialog_option_id",
			"dialog_id",
			"parent_dialog_script_id",
			"prompt",
			"link_type",
			"link_id",
			"link_info",
			"requirement_root_package_id",
			"sort_index"
        ],

		defaults: {
		}

	});
});

