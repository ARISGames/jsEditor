define([
	'jquery',
	'underscore',
	'backbone',
	'models/session',
	'config',
	'vent'
], function($, _, Backbone, session, config, vent) {

	return Backbone.Model.extend({

		parse: function(json) {
			// Remove the outer json attribute {data: ...} on CRUD operations
			if(this.collection == undefined || json.data) {
				return json.data;
			}

			// Being called from collection which has already parsed.
			else {
				return json;
			}
		},


		amfphp_url_root: config.aris_api_url,


		amfphp_url_patterns: {
			create: "",
			read:   "",
			update: "",
			delete: ""
		},


		// Allow editable attributes to be defined conditionally for new/existing.
		// used for Quests.
		get_amfphp_url_attributes: function()
		{
			return _.result(this, 'amfphp_url_attributes');
		},


		// Fields to iterate over for quick form building
		editable_attributes: function() {
			var model = this;

			return _.reject(this.get_amfphp_url_attributes(), function(attribute_name) {
				return attribute_name === "game_id" || attribute_name === model.idAttribute;
			});
		},


		// Main value to display (usually name or title)
		to_s: function() {
			return this.get(_.first(this.editable_attributes()));
		},


		// This helps compare two instances of a model
		// app.storage will make this mostly redundant once its in place everywhere.
		is: function(model) {
			return this.id === model.id && this.idAttribute === model.idAttribute;
		},

		// Callback on create and update
		save: function(attrs, options) {
			options || (options = {});

			var model = this;
			var success_callback = options.success;
			var create_callback = options.create;
			var update_callback = options.update;

			options.success = function() {
				if(model.changedAttributes()[model.idAttribute])
				{
					if(create_callback) {
						create_callback.apply(this, arguments);
					}
					model.trigger("create", model);
				}
				else {
					if(update_callback) {
						update_callback.apply(this, arguments);
					}
					model.trigger("update", model);
				}

				if(success_callback) {
					success_callback.apply(this, arguments);
				}
			}

			options.xhr = function() {
				var xhr = $.ajaxSettings.xhr();
				if(xhr.upload) {
					if(options.progress) {
						xhr.upload.addEventListener('progress', options.progress, false);
					}
				}
				return xhr;
			}

			return Backbone.Model.prototype.save.call(this, attrs, options);
		},



		sync: function(method, model, options) {
			options || (options = {});

			// Make Aris happy with request.
			options.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			options.data = null;
			options.type = "POST";
			options.jsonp = false;

			// Collect needed values for url
			var template_values = {}
			_.extend(template_values, model.attributes);
			_.extend(template_values, {id: model.id});

			var auth_data = {"auth": {"key": session.auth_token(), "user_id": session.editor_id()}};

			// Build url from model attributes for update
			if(method === "read") {
				vent.trigger("application:working:show", "<span class='glyphicon glyphicon-refresh'></span> Loading");
				var request_attributes = {}

				request_attributes[model.idAttribute] = model.get(model.idAttribute);
				_.extend(request_attributes, auth_data);

				options.data = JSON.stringify(request_attributes);
			}
			else if(method === "update" || method === "create" || method === "delete")
			{
				vent.trigger("application:working:show", "<span class='glyphicon glyphicon-floppy-disk'></span> Saving");

				var model_attributes = {}
				$.each(this.get_amfphp_url_attributes(), function(index, key) {

					// On create don't include the id field
					if(key === model.idAttribute && model.get(key) == null) {
						return;
					}

					// Grab the values of each attribute listed for model
					if(_.include(_.keys(model.attributes), key)) {
						var value = model.get(key);
						model_attributes[key] = value;
					}
					else {
						throw "syncError during "+method+": attribute '"+key+"' not found on model";
					}
				});

				// Inject authorization json.
				_.extend(model_attributes, auth_data);

				options.data = JSON.stringify(model_attributes);
			}
			else if(method === "patch") {
				var patch_attributes = {};

				_.extend(patch_attributes, auth_data);
				_.extend(patch_attributes, options.attrs);

				// FIXME this is just to save triggers as a patch for now
				var id_attribute = model.idAttribute;
				patch_attributes[model.idAttribute] = model.get(model.idAttribute);
				patch_attributes["game_id"] = model.get("game_id");

				options.data = JSON.stringify(patch_attributes);
			}

			// Render url with values
			var url_method = method === "patch" ? "update" : method;
			var url      = this.amfphp_url_root + this.amfphp_url_templates[url_method] + this.amfphp_url_patterns[url_method];
			var template = _.template(url);
			options.url  = template(template_values);


			// Handle amfPHP 200 based errors.
			var success_callback = options.success;


			// TODO make sure this does not break expected callback argument order for error vs success.
			options.success = function(data, success, success_options) {

				vent.trigger("application:working:hide");

				if(data.faultCode) {
					throw "amf Model Fault: "+data.faultString+" for "+options.url;
				}
				else if(data.returnCode != 0) {
					if(options.amf_error) {
						options.amf_error.apply(this, [data.returnCode, data.returnCodeDescription]);
					}
					else {
						throw "Model returnCode "+data.returnCode+": "+data.returnCodeDescription+" for "+options.url;
					}
				}
				else {
					// Call original callback
					if(success_callback) {
						success_callback.apply(this, arguments);
					}
				}
			}

			return Backbone.sync.apply(this, arguments);
		}

	});
});
