define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'factory_id',

		amfphp_url_templates: {
			read:   "factories.getFactory",
			update: "factories.updateFactory",
			create: "factories.createFactory",
			delete: "factories.deleteFactory"
		},

		amfphp_url_attributes: [
			"game_id",
			"factory_id",
			"name",
			"description"
        ],

		defaults: {
			name: "",
			description: ""
		}

	});
});

