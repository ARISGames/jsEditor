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
			"name",
			"description",
			"icon_media_id",
			"media_id"
//          "droppable":1,
//          "destroyable":1,
//          "max_qty_in_inventory":500,
//          "weight":0,
//          "url":"http://www.arisgames.org",
//          "type":"NORMAL"
        ],

		defaults: {
			name: ""
		}

	});
});

