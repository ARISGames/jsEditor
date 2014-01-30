define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/session'
], function($, _, Backbone, AmfBaseModel, Session) {

	return AmfBaseModel.extend({
		idAttribute: 'npc_id',


		amfphp_url_templates: {
			read:   "npcs.getNpc",
			update: "npcs.updateNpc",
			create: "npcs.createNpc"
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
