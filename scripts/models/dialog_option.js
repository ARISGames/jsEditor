define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'dialog_option_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialogOption",
			update: "dialogs.updateDialogOption",
			create: "dialogs.createDialogOption",
			delete: "dialogs.deleteDialogOption"
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
			prompt: "",
			link_type: "EXIT",
			link_id: "0",
			link_info: "",
			requirement_root_package_id: "0",
			sort_index: "0"
		}

	});
});

