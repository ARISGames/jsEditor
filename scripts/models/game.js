define([
	'jquery',
	'underscore',
	'backbone',
	'models/json_base',
	'models/session'
], function($, _, Backbone, JsonBaseModel, session) {

	return JsonBaseModel.extend({
		idAttribute: 'game_id',


		amfphp_url_templates: {
			read:   "games.getGame",
			update: "games.updateGame",
			create: "games.createGameJSON",
			delete: "games.deleteGame"
		},


		amfphp_url_patterns: {
			read:   "/<%= id %>",
			update: "/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>",
			create: "",
			delete: "/<%= id %>/<%= editor_id %>/<%= editor_token %>"
		},

		amfphp_url_attributes: [
          "name",
          "description",
          "icon_media_id",
          "media_id",
          "map_type",
          "latitude",
          "longitude",
          "zoom_level",
          "show_player_location"
        ],
        
		aamfphp_url_attributes: [
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
		],


		defaults: {
			name: "",
			description: "",
			icon_media_id: 0,
			media_id: 0,
			ready_for_public: 0,
			is_locational: 1,
			on_launch_node_id: 0,
			game_complete_node_id: 0,
			allow_share_note_to_map: 1,
			allow_share_note_to_book: 1,
			allow_player_tags: 1,
			allow_note_comments: 1,
			allow_note_likes: 1,
			pc_media_id: 0,
			use_player_pic: 1,
			map_type: "STREET",
			show_player_location: 1,
			full_quick_travel: 0,
			inventory_weight_cap: 0,
			allow_trading: 0
		}
	});
});
