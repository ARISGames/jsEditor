define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');

  return JsonBaseModel.extend({
    idAttribute: 'dialog_character_id',

    amfphp_url_templates: {
      read:   "dialogs.getDialogCharacter",
      update: "dialogs.updateDialogCharacter",
      create: "dialogs.createDialogCharacter",
      delete: "dialogs.deleteDialogCharacter"
    },

    amfphp_url_attributes: [
      "game_id",
      "dialog_character_id",
      "name",
      "title",
      "media_id"
        ],

    defaults: {
      name: "",
      title: "",
      media_id: "0"
    },


    /* Associations */

    game: function() {
      return storage.games.retrieve(this.get('game_id'));
    },

    media: function() {
      return storage.media.retrieve(this.get('media_id'));
    },

    default_icon: function() {
      return storage.media.retrieve('0');
    },

    /* Helpers */

    media_thumbnail: function() {
      return this.media().thumbnail_for();
    }

  });
});

