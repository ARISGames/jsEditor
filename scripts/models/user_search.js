define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'search',

		amfphp_url_templates: {
			read:   "users.getUserForSearch",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"game_id",
			"search"
        ]
	});
});

