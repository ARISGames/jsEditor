define([
  'models/json_base',
  'storage',
],
function(
  JsonBaseModel,
  storage
)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'plaque_id',

    type_name: 'Plaque',

    amfphp_url_templates:
    {
      read:   "plaques.getPlaque",
      update: "plaques.updatePlaque",
      create: "plaques.createPlaque",
      delete: "plaques.deletePlaque"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "plaque_id",
      "name",
      "description",
      "media_id",
      "icon_media_id",
      "event_package_id"
    ],

    defaults:
    {
      name: "",
      description: "",
      media_id: "0",
      icon_media_id: "0",
      event_package_id: "0"
    },


    /* Associations */
    icon:  function() { return storage.media.retrieve(this.get('icon_media_id')); },
    media: function() { return storage.media.retrieve(this.get('media_id')); },
    default_icon: function() { return storage.media.retrieve('0'); },

    /* Helpers */
    icon_thumbnail: function() { return this.icon().thumbnail_for(this); },
    media_thumbnail: function() { return this.media().thumbnail_for(); }

  });
});

