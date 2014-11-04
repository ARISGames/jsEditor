define(function(require) {
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');


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
			"media_id",
			"droppable",
			"destroyable",
			"max_qty_in_inventory",
			"weight",
			"url",
			"type"
        ],

		defaults: {
			name: "",
			description: "",
			droppable: "1",
			destroyable: "1",
			max_qty_in_inventory:"500",
			weight:"0",
			url: "",
			type: "NORMAL",
			icon_media_id: "0",
			media_id: "0"
		},


		/* Associations */

		icon: function() {
			return storage.media.retrieve(this.get('icon_media_id'));
		},

		media: function() {
			return storage.media.retrieve(this.get('media_id'));
		},

		default_icon: function() {
			return storage.media.retrieve('0');
		},

		/* Helpers */

		icon_thumbnail: function() {
			return this.icon().thumbnail_for(this);
		},

		icon_thumbnail: function() {
			return this.media().thumbnail_for();
		}
	});
});

