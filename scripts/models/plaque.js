define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({
		idAttribute: 'node_id',

		amfphp_url_templates: {
			read:   _.template("http://arisgames.org/server/json.php/v1.nodes.getNode/<%= game_id %>/<%= node_id %>"),
			update: _.template("http://arisgames.org/server/json.php/v1.nodes.updateNode/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>")
		},


		// attribute order for url here
		// TODO seems a bit clever, a long template list might bet better ie {game_id}/{name}/{description}?
		amfphp_url_attributes: [
			"game_id",
			"node_id",
			"title",
			"text",
			"media_id",
			"icon_media_id",
			"opt1_text",
			"opt1_node_id",
			"opt2_text",
			"opt2_node_id",
			"opt3_text",
			"opt3_node_id",
			"require_answer_string",
			"require_answer_incorrect_node_id",
			"require_answer_correct_node_id"
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
						var value = model.attributes[key];

						// Return empty string since map ignores nulls
						if(value === null) {
							return "";
						}
						else {
							return value;
						}
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
