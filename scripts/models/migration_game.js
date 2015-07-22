define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');
  var config        = require('config');
  var Media         = require('models/media');
  var session       = require('models/session');

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

      var model = this;
      var migration_data = {"game_id": this.get("game_id"), "auth": session.auth_json()};

      $.ajax({
        url: config.migration_api_url + "migration.migrateGame",
        type: 'POST',
        data: JSON.stringify(migration_data),
        processData: false,
        success: function(data) {

          var game_attributes = JSON.parse(data).data;

          // Find or Add game.
          storage.games.retrieve(game_attributes);

          // Temporary update local reference count
          model.get("prev_migrations"   ).push(String(Date.now()));
          model.get("my_prev_migrations").push(String(Date.now()));
          model.set("migrating", "false");

          if(options.success) {
            options.success.call();
          }
        }
      });

    }

  });
});

