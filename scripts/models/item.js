define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'item_id',

		amfphp_url_templates: {
			read:   "items.getItem",
			update: "items.updateItem",
			create: "items.createItem",
			delete: "items.deleteItem"
		},

		amfphp_url_attributes: [
			"game_id",
			"item_id",
			"name"
        ],

		defaults: {
			name: ""
		}

	});
});

