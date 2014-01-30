define([
	'jquery',
	'underscore',
	'backbone',
	'models/session'
], function($, _, Backbone, Session) {

	return Backbone.Model.extend({

		parse: function(json) {
			// Being called from Collection.fetch vs Model.fetch
			if(this.collection == undefined) {
				return json.data;
			}
			else {
				return json;
			}
		},


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


			// Handle amfPHP 200 based errors.
			var success_callback = options.success;

			// TODO make sure this does not break expected callback argument order for error vs success.
			options.success = function(data, success, success_options) {
				if(data.faultCode) {
					// options.error.apply(this, arguments);
					throw "amf Fault: "+data.faultString;
				}
				else {
					success_callback.apply(this, arguments);
				}
			}

			// TODO Catch success and trigger error method if parsed data has non 0 response code or has fault code
			//
			return Backbone.sync.apply(this, arguments);
		}

	});
});
