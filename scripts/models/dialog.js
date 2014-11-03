define([
	'models/json_base',
	'storage'
], function(JsonBaseModel, storage) {

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
			"intro_dialog_script_id"
        ],

		defaults: {
			name: "",
			description: "",
			icon_media_id: "0",
			intro_dialog_script_id: "0"
		},


		/* Associations */

		icon: function() {
			return storage.media.retrieve(this.get('icon_media_id'));
		},

		default_icon: function() {
			return storage.media.retrieve('0');
		},

	});
});

