define([
	'jquery',
	'underscore',
	'backbone',
	'models/json_base',
	'models/session'
], function($, _, Backbone, JsonBaseModel, session) {

	return JsonBaseModel.extend({
		idAttribute: 'npc_id',

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
			"icon_media_id",
			"media_id",
			"opening_script_id",
			"closing_script_id"
        ],

		defaults: {
          name: "New Character",
          description: "",
          icon_media_id: 0,
          media_id: 0,
          opening_script_id: 0,
          closing_script_id: 0
		}

	});
});

