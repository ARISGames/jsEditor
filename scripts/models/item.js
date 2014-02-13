define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'item_id',


		initialize: function() {
			this.on("create", function(model) {
				var folder = new Content({content_id: model.get(model.idAttribute), content_type: "Item", game_id: model.get("game_id")});
				folder.save();
			});
		},


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
			"tradeable",
			"is_attribute",
			"max_qty_in_inventory",
			"weight",
			"url",
			"type"
		],


		defaults: {
			name: "",
			description: "",
			icon_media_id: 2,
			media_id: 0,
			droppable: "",
			destroyable: "",
			tradeable: 0,
			is_attribute: "",
			max_qty_in_inventory: 500,
			weight: 0,
			url: "",
			type: "NORMAL"
		}
	});
});
