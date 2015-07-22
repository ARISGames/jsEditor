define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');


  return JsonBaseModel.extend({
    idAttribute: 'tag_id',

    amfphp_url_templates: {
      read:   "tags.getTag",
      update: "tags.updateTag",
      create: "tags.createTag",
      delete: "tags.deleteTag"
    },

    amfphp_url_attributes: [
      "tag_id",
         "game_id",
      "tag",
      "visible",
         "media_id"
    ],

    defaults: {
      tag: "",
         media_id: "0",
      visible: "1"
    },


    /* Associations */

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

