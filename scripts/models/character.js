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
			read:   _.template("http://arisgames.org/server/json.php/v1.npcs.getNpc/<%= game_id %>/<%= node_id %>"),
			update: _.template("http://arisgames.org/server/json.php/v1.npcs.updateNpc/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>")
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
		]
	});
});
