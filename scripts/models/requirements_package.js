define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'requirement_root_package_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"game_id",
        ],

		defaults: {
		}

	});
});


