define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');


  return JsonBaseModel.extend({
    idAttribute: 'trigger_id',

    amfphp_url_templates: {
      read:   "triggers.getTrigger",
      update: "triggers.updateTrigger",
      create: "triggers.createTrigger",
      delete: "triggers.deleteTrigger"
    },

    amfphp_url_attributes: [
      "game_id",
      "trigger_id",
      "instance_id",
      "scene_id",
      "title",
      "requirement_root_package_id",
      "type",
      "latitude",
      "longitude",
      "distance",
      "infinite_distance",
      "wiggle",
      "show_title",
      "hidden",
      "trigger_on_enter",
      "qr_code",
      "seconds",
      "beacon_uuid",
      "beacon_major",
      "beacon_minor",
      "icon_media_id",
    ],

    defaults: function() {
      return {
        title: "",
        type: "LOCATION",
        latitude: "0",
        longitude: "0",
        distance: "25",
        infinite_distance: "1",
        wiggle: "0",
        show_title: "1",
        hidden: "0",
        trigger_on_enter: "0",
        qr_code: new Date().getTime(),
        seconds: "10",
        beacon_uuid: "",
        beacon_major: "0",
        beacon_minor: "0",
        requirement_root_package_id: "0",
        icon_media_id: "0",
      }
    },

    /* Associations */

    game_object: function() {
      return this.instance().game_object();
    },

    instance: function() {
      return storage.instances.retrieve(this.get('instance_id'));
    },

    game: function() {
      return storage.games.retrieve(this.get('game_id'));
    },

    scene: function() {
      return storage.scenes.retrieve(this.get('scene_id'));
    },

    icon: function() {
      return storage.media.retrieve(this.get('icon_media_id'));
    },

    default_icon: function() {
      return storage.media.retrieve('0');
    },

    /* Helpers */
    icon_thumbnail: function() {
      return this.icon().thumbnail_for(this);
    }

  },
  // Static methods
  {
    title_for: function(game_object) {
      return game_object.get("name");
    }
  });
});

