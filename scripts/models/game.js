define([
	'jquery',
	'underscore',
	'backbone',
	'models/amf_base',
	'models/session'
], function($, _, Backbone, AmfBaseModel, Session) {

	return AmfBaseModel.extend({
		idAttribute: 'game_id',


		amfphp_url_templates: {
			read:   "games.getGame",
			update: "games.updateGame"
		},


		amfphp_url_patterns: {
			read:   "/<%= id %>",
			update: "/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>",
			create: "/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>"
		},


		amfphp_url_attributes: [
			"game_id",
			"name",
			"description",
			"icon_media_id",
			"media_id",
			"ready_for_public",
			"is_locational",
			"on_launch_node_id",
			"game_complete_node_id",
			"allow_share_note_to_map",
			"allow_share_note_to_book",
			"allow_player_tags",
			"allow_note_comments",
			"allow_note_likes",
			"pc_media_id",
			"use_player_pic",
			"map_type",
			"show_player_location",
			"full_quick_travel",
			"inventory_weight_cap",
			"allow_trading"
		]
	});
});
