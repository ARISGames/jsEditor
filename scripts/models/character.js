define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/content'
], function($, _, Backbone, AmfBaseModel, Content) {

	return AmfBaseModel.extend({
		idAttribute: 'npc_id',


		initialize: function() {
			this.on("create", function(model) {
				var folder = new Content({content_id: model.get(model.idAttribute), content_type: "Npc", game_id: model.get("game_id")});
				folder.save();
			});
		},


		amfphp_url_templates: {
			read:   "npcs.getNpc",
			update: "npcs.updateNpc",
			create: "npcs.createNpc",
			delete: "npcs.deleteNpc"
		},


		amfphp_url_attributes: [
			"game_id",
			"npc_id",
			"name",
			"description",
			"text",
			"closing",
			"media_id",
			"icon_media_id"
		],


		defaults: {
			name: "",
			description: "",
			text: "",
			closing: "",
			media_id: 0,
			icon_media_id: 1
		}
	});
});
