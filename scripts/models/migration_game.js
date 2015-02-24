define(function(require) {
	var JsonBaseModel = require('models/json_base');
	var storage       = require('storage');
	var config        = require('config');
	var Media         = require('models/media');

	return JsonBaseModel.extend({
		idAttribute: 'game_id',

		amfphp_url_templates: {
			read:   "",
			update: "",
			create: "",
			delete: ""
		},

		amfphp_url_attributes: [
			"game_id"
		],

		defaults: {
			name: "",
			description: "",
			migrating: "false"
		},


		/* Associations */

		icon: function() {
			throw 'Migration games have no icon, use icon_thumbnail directly';
		},

		/* Helpers */

		icon_thumbnail: function() {
			return this.get("icon_media_url");
		},


		/* Migrations */

		migrate: function(options) {
			options || (options = {});

			this.set("migrating", "true")

			//var media_id = Math.floor((Math.random() * 200) + 50);

			//var fake_response = {"game_id":String(Date.now()),"name":this.get("name") + String(Date.now()),"description":"GIFFY","icon_media_id":String(media_id),"media_id":"0","map_type":"STREET","map_latitude":"0","map_longitude":"0","map_zoom_level":"0","map_show_player":"1","map_show_players":"1","map_offsite_mode":"0","notebook_allow_comments":"1","notebook_allow_likes":"1","notebook_trigger_scene_id":"0","notebook_trigger_requirement_root_package_id":"0","notebook_trigger_title":"","notebook_trigger_icon_media_id":"0","notebook_trigger_distance":"0","notebook_trigger_infinite_distance":"0","notebook_trigger_wiggle":"0","notebook_trigger_show_title":"0","notebook_trigger_hidden":"0","notebook_trigger_on_enter":"0","inventory_weight_cap":"0","published":"0","type":"LOCATION","intro_scene_id":"0"};

			//var thing = storage.media.retrieve({media_id: String(media_id), thumb_url: ""});


			//setTimeout(function() {
			//	setTimeout(function() { thing.set("thumb_url", "https://placekitten.com/g/"+media_id+"/"+media_id); }, 300);
			//	var thing2 = storage.games.retrieve(fake_response);
			//
			//}, 10000);

			var view = this;
			var migration_data = {"game_id": this.get("game_id"), "auth": session.auth_json()};

			$.ajax({
				url: config.migration_api_url + "migrate.v1GamesForV2User",
				type: 'POST',
				data: JSON.stringify(migration_data),
				processData: false,
				success: function(data) {

					var game_attributes = data.data;

					// Find or Add game.
					storage.games.retrieve(game_attributes);

					// Temporary update local reference count
					view.get("prev_migrations"   ).push(String(Date.now()));
					view.get("my_prev_migrations").push(String(Date.now()));
					view.set("migrating", "false");

					if(options.success) {
						options.success.call();
					}
				}
			});

		}

	});
});
