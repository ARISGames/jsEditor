define([
  'module',
  'jquery',
  'underscore',
  'backbone',
  'cookie',
  'config',
  'vent'
],
function(
  module,
  $,
  _,
  Backbone,
  Cookie,
  config,
  vent
)
{
  var Session = Backbone.Model.extend({
    logged_in: function() {
      if($.cookie('read_write_key') != undefined) {
        return true;
      }
      else {
        return false;
      }
    },

    login: function(options) {
      $.ajax({
        url: config.aris_api_url + "users.logIn",
        type: 'POST',
        data: JSON.stringify({"user_name": options.username, "password": options.password, "permission": "read_write"}),
        processData: false,
        success: function(data) {
          var json = JSON.parse(data);
          if(json.returnCode == 0) {
            $.cookie('username',   json.data.user_name);
            $.cookie('editor_id',  json.data.user_id);
            $.cookie('read_write_key', json.data.read_write_key);

            vent.trigger('session.login');
          }
          else {
            vent.trigger("application:alert", {text: json.returnCodeDescription})
          }
        }
      });
    },

    register: function(options) {
      $.ajax({
        url: config.aris_api_url + "users.createUser",
        type: 'POST',
        data: JSON.stringify({"user_name": options.username, "email": options.email, "password": options.password, "permission": "read_write"}),
        processData: false,
        success: function(data) {
          var json = JSON.parse(data);
          if(json.returnCode == 0) {
            $.cookie('username',   json.data.user_name);
            $.cookie('editor_id',  json.data.user_id);
            $.cookie('read_write_key', json.data.read_write_key);

            vent.trigger('session.login');
          }
          else {
            vent.trigger("application:alert", {text: json.returnCodeDescription})
          }
        }
      });
    },

    send_reset_link: function(options)
    {
      if(options.user_name === "") { delete options.username }
      if(options.email    === "") { delete options.email    }

      $.ajax({
        url: config.aris_api_url + "users.requestForgotPasswordEmail",
        type: 'POST',
        data: JSON.stringify(options),
        processData: false,
        success: function(data) {
          var json = JSON.parse(data);
          if(json.returnCode == 0) {
            vent.trigger('session.sent_reset_link');
          }
          else {
            vent.trigger("application:alert", {text: json.returnCodeDescription})
          }
        }
      });
    },

    logout: function()
    {
      $.removeCookie('username');
      $.removeCookie('editor_id');
      $.removeCookie('read_write_key');

      vent.trigger('session.logout');
    },

    username: function() { return $.cookie('username'); },
    editor_id: function() { return $.cookie('editor_id'); },
    read_write_key: function () { return $.cookie('read_write_key'); },
    auth_json: function() { return {"key": this.read_write_key(), "user_id": this.editor_id()}; }
  });

  return new Session();
});

