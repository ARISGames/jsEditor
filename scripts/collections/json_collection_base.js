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
				_.extend(request_attributes, auth_data);

				options.data = JSON.stringify(request_attributes);
			}

			options.url = this.amfphp_url_root + this.amfphp_url;

			return Backbone.sync.apply(this, arguments);
		},


		parse: function(json, response) {
			if(json.returnCode != 0) {
				throw "returnCode "+json.returnCode+": "+json.returnCodeDescription;
			}
			else {
				return json.data;
			}
		},

	});
});

