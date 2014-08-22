define([
	'models/json_base'
], function(JsonBaseModel) {

	return JsonBaseModel.extend({
		idAttribute: 'game_id',

		amfphp_url_templates: {
			read:   "games.getGame",
			update: "games.updateGame",
			create: "games.createGame",
			delete: "games.deleteGame"
		},

		amfphp_url_attributes: [
			"game_id",
			"name",
			"description",
			"icon_media_id",
			"media_id",
			"published",
			"type",
			"intro_scene_id",
			"map_type",
			"map_latitude",
			"map_longitude",
			"map_zoom_level",
			"map_show_player",
			"map_show_players",
			"map_offsite_mode",
			"notebook_allow_comments",
			"notebook_allow_player_tags",
			"notebook_allow_likes",
			"inventory_weight_cap"
		],

		defaults: {
			name: "",
			description: "",
			icon_media_id: "0",
			media_id: "0",
			published: "0",
			type: "LOCATION",
			intro_scene_id: "0",
			map_type: "STREET",
			map_latitude: "0.0",
			map_longitude: "0.0",
			map_zoom_level: "0",
			map_show_player: "1",
			map_show_players: "1",
			map_offsite_mode: "0",
			notebook_allow_comments: "1",
			notebook_allow_player_tags: "1",
			notebook_allow_likes: "1",
			inventory_weight_cap: "0"
		}
	});
});
