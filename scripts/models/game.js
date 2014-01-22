define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({
		idAttribute: 'game_id',


		amfphp_url_templates: {
			read:   _.template("http://arisgames.org/server/json.php/v1.games.getGame/<%= game_id %>"),
			update: _.template("http://arisgames.org/server/json.php/v1.games.updateGame/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>")
		},


		// attribute order for url here
		// TODO seems a bit clever, a long template list might bet better ie {game_id}/{name}/{description}?
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
		],
		

		parse: function(json) {
			// Being called from Collection.fetch vs Model.fetch
			if(this.collection == undefined) {
				return json.data;
			}
			else {
				return json;
			}
		},


		// TODO find out when does url/urlroot get called for single vs collection
		sync: function(method, model, options) {
			options || (options = {});

			// Make Aris happy with request.
			options.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			options.data = null;
			options.type = "GET";

			// Collect needed values for url
			var template_values = {}
			_.extend(template_values, model.attributes);

			var session = new Session;
			_.extend(template_values, {editor_id: session.editor_id(), editor_token: session.auth_token()});

			// Build url from model attributes for update
			if(method === "update") {
				options.type = "POST";

				var model_attributes_url = $.map(this.amfphp_url_attributes, function(key) {
					if(_.include(_.keys(model.attributes), key)) {
						return model.attributes[key];
					}
					else {
						throw "amf update URL Error: attribute '"+key+"' not found on model";
					}
				}).join("/");

				_.extend(template_values, {model_attributes_url: model_attributes_url});
			}
			
			// Render url with values
			var template = this.amfphp_url_templates[method];
			options.url  = template(template_values);

			// TODO Catch success and trigger error method if parsed data has non 0 response code or has fault code
			//
			return Backbone.sync.apply(this, arguments);
		}

	});
});
