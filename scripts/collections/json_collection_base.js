define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'config',
  'vent'
],
function(
  $,
  _,
  Backbone,
  session,
  config,
  vent
)
{
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

      var auth_data = {"auth": session.auth_json()};

      if(method === "read") {
        vent.trigger("application:working:show", "<span class='glyphicon glyphicon-refresh'></span> Loading");

        var request_attributes = {}

        // Add parent id into json request
        if(this.parent) {
          request_attributes[this.parent.idAttribute] = this.parent.get(this.parent.idAttribute);
        }

        // Collections still need a game id if parent isn't game
        if(this.game) {
          request_attributes["game_id"] = this.game.id;
        }

        // Allow extra attributes. ie. search criteria
        if(options.data) {
          _.extend(request_attributes, options.data);
        }

        _.extend(request_attributes, auth_data);

        options.data = JSON.stringify(request_attributes);
      }

      options.url = this.amfphp_url_root + this.amfphp_url;

      // Handle amfPHP 200 based errors.
      var success_callback = options.success;


      // TODO make sure this does not break expected callback argument order for error vs success.
      options.success = function(data, success, success_options) {

        vent.trigger("application:working:hide");

        if(data.faultCode) {
          throw "amf Collection Fault: "+data.faultString+" for "+options.url;
        }
        else if(data.returnCode != 0) {
          if(options.amf_error) {
            options.amf_error.apply(this, [data.returnCode, data.returnCodeDescription]);
          }
          else {
            throw "Collection returnCode "+data.returnCode+": "+data.returnCodeDescription+" for "+options.url;
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
    },


    parse: function(json, response) {
      if(json.faultCode) {
        throw "amf Fault: "+json.faultString;
      }
      else if(json.returnCode === 6) {
        session.logout();
        console.error("Logout! got returnCode "+json.returnCode+": "+json.returnCodeDescription);
      }
      else if(json.returnCode !== 0) {
        throw "returnCode "+json.returnCode+": "+json.returnCodeDescription;
      }
      else {
        return json.data;
      }
    },


    // App storage
    retrieve: function(attributes) {
      // Get by ID or by attribute hash
      if(typeof attributes === "string" || typeof attributes === "number")
      {
        var id = attributes;
        var attributes = null;
      }
      else
      {
        var id = attributes[new this.model().idAttribute];
      }

      // Find existing or Initialize.
      var model = this.get(id);
      if(!model)
      {
        var model = new this.model();
        model.set(model.idAttribute, id);

        // Got values from caller, else fetch from server.
        if(attributes) {
          model.set(attributes);
        }
        else if(id !== "0")
        {
          model.fetch();
        }
        this.add(model);
      }

      // Update attributes from caller
      if(attributes)
      {
        model.set(attributes);
      }

      return model;
    }

  });
});

