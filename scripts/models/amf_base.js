define([
  'jquery',
  'underscore',
  'backbone',
  'models/session'
],
function(
  $,
  _,
  Backbone,
  session
)
{
  return Backbone.Model.extend({

    parse: function(json) {
      // Remove the outer json attribute {data: ...}
      if(this.collection == undefined) {
        // Got an ID back on create
        if(typeof json.data === "number") {
          var data = {};
          data[this.idAttribute] = json.data;
          return data;
        }

        // Full json object on read
        else {
          return json.data;
        }
      }

      // Being called from collection which has already parsed.
      else {
        return json;
      }
    },


    amfphp_url_root: "http://dev.arisgames.org/server/json.php/v2.",


    amfphp_url_patterns: {
      read:   "/<%= game_id %>/<%= id %>",
      update: "/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>",
      create: "/<%= model_attributes_url %>/<%= editor_id %>/<%= editor_token %>",
      delete: "/<%= game_id %>/<%= id %>/<%= editor_id %>/<%= editor_token %>"
    },


    // Allow editable attributes to be defined conditionally for new/existing.
    // used for Quests.
    get_amfphp_url_attributes: function()
    {
      if(_.isFunction(this.amfphp_url_attributes))
      {
        return this.amfphp_url_attributes.call(this);
      }
      else
      {
        return this.amfphp_url_attributes;
      }
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


    // Callback on create and update
    save: function(attrs, options) {
      options || (options = {});

      var model = this;
      var success_callback = options.success;

      options.success = function() {
        if(model.changedAttributes()[model.idAttribute])
        {
          model.trigger("create", model);
        }
        else {
          model.trigger("update", model);
        }

        if(success_callback) {
          success_callback.apply(this, arguments);
        }
      }

      return Backbone.Model.prototype.save.call(this, attrs, options);
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
      _.extend(template_values, {id: model.id});

      _.extend(template_values, {editor_id: session.editor_id(), editor_token: session.read_write_key()});

      // Build url from model attributes for update
      if(method === "update" || method === "create" || method === "delete") {
        options.type = "POST";

        var model_attributes_url = $.map(this.get_amfphp_url_attributes(), function(key) {

          // On create don't include the id field
          if(key === model.idAttribute && model.attributes[key] == null) {
            return;
          }

          // Grab the values of each attribute listed for model
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
      var url      = this.amfphp_url_root + this.amfphp_url_templates[method] + this.amfphp_url_patterns[method];
      var template = _.template(url);
      options.url  = template(template_values);


      // Handle amfPHP 200 based errors.
      var success_callback = options.success;

      // TODO make sure this does not break expected callback argument order for error vs success.
      options.success = function(data, success, success_options) {
        if(data.faultCode) {
          throw "amf Fault: "+data.faultString;
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

