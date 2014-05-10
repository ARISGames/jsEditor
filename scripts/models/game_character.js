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
			update: "npcs.updateNpcJSON",
			create: "npcs.createNpcJSON",
			delete: "npcs.deleteNpc"
		},

		amfphp_url_attributes: [
			"name",
			"game_id",
			"npc_id"
        ],

		defaults: {
			name: "New Character"
		}

	});
});

