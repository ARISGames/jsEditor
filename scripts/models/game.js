define(function(require) {
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');
	var session       = require('models/session');
	var config        = require('config');


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
			inventory_weight_cap: "0",
			duplicating: "false"
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

		media_thumbnail: function() {
			return this.media().thumbnail_for();
		},


		/* Duplication */
		duplicate: function(options) {
			options || (options = {});

			this.set("duplicating", "true")

			var view = this;
			var duplication_data = {"game_id": this.get("game_id"), "auth": session.auth_json()};

			$.ajax({
				url: config.aris_api_url + "duplicate.duplicateGame",
				type: 'POST',
				data: JSON.stringify(duplication_data),
				processData: false,
				success: function(data) {

					var game_attributes = JSON.parse(data).data;

					// Find or Add game.
					storage.games.retrieve(game_attributes);

					view.set("duplicating", "false");

					if(options.success) {
						options.success.call();
					}
				}
			});
		}
	});
});
