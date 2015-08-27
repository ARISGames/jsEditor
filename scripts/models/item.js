define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');

  return JsonBaseModel.extend(
  {
    idAttribute: 'item_id',

    type_name: 'Item',

    amfphp_url_templates: {
      read:   "items.getItem",
      update: "items.updateItem",
      create: "items.createItem",
      delete: "items.deleteItem"
    },

    amfphp_url_attributes: [
      "game_id",
      "item_id",
      "name",
      "description",
      "icon_media_id",
      "media_id",
      "delta_notification",
      "droppable",
      "destroyable",
      "max_qty_in_inventory",
      "weight",
      "url",
      "type",

      "tag_id"
        ],

    defaults: {
      name: "",
      description: "",
      delta_notification: "1",
      droppable: "0",
      destroyable: "0",
      max_qty_in_inventory:"500",
      weight:"0",
      url: "",
      type: "NORMAL",
      icon_media_id: "0",
      media_id: "0",

      tag_id:"0"
    },


    icon: function() { return storage.media.retrieve(this.get('icon_media_id')); },
    media: function() { return storage.media.retrieve(this.get('media_id')); },
    default_icon: function() { return storage.media.retrieve('0'); },

    icon_thumbnail: function() { return this.icon().thumbnail_for(this); },
    media_thumbnail: function() { return this.media().thumbnail_for(); }
  });
});

