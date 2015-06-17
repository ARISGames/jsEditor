define(function(require)
{
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');
	var _S            = require('underscore.string');

	return JsonBaseModel.extend({
		idAttribute: 'dialog_script_id',

		amfphp_url_templates: {
			read:   "dialogs.getDialogScript",
			update: "dialogs.updateDialogScript",
			create: "dialogs.createDialogScript",
			delete: "dialogs.deleteDialogScript"
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
		},

		/* Association */

		dialog: function()
		{
			return storage.dialogs.retrieve(this.get("dialog_id"));
		},


		/* Presenter */

		name: function()
		{
			return "(" + this.dialog().get("name") + ") " + _S.prune(this.get("text"), 15);
		},

		icon: function()
		{
			return this.dialog().icon();
		},

		icon_thumbnail: function()
		{
			return this.dialog().icon_thumbnail();
		}

	});
});

