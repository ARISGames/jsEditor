define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
	'config',
	'vent'
], function($, _, Backbone, session, config, vent) {
	return Backbone.Collection.extend({

		initialize: function(models, options) {
			options || (options = {});
			this.parent = options.parent;
			this.game   = options.game;
		},

		amfphp_url_root: config.aris_api_url,


		sync: function(method, model, options) {
			options || (options = {});

			options.method = "POST"

			var auth_data = {"auth": {"key": session.auth_token(), "user_id": session.editor_id()}};

			if(method === "read") {
				var request_attributes = {}

				// Add parent id into json request
				if(this.parent) {
					request_attributes[this.parent.idAttribute] = this.parent.get(this.parent.idAttribute);
				}

				// Collections still need a game id if parent isn't game
				if(this.game) {
					request_attributes["game_id"] = this.game.id;
				}

				_.extend(request_attributes, auth_data);

				options.data = JSON.stringify(request_attributes);
			}

			options.url = this.amfphp_url_root + this.amfphp_url;

			return Backbone.sync.apply(this, arguments);
		},


		parse: function(json, response) {
			if(json.faultCode) {
				throw "amf Fault: "+json.faultString;
			}
			else if(json.returnCode != 0) {
				throw "returnCode "+json.returnCode+": "+json.returnCodeDescription;
			}
			else {
				return json.data;
			}
		},

	});
});

