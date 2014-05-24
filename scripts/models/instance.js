define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'instance_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"instance_id",
			"game_id",
			"object_id",
			"object_type"
        ],

		defaults: {
			object_type: "DIALOG",
		}

	});
});
