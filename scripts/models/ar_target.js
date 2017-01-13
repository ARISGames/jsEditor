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
    idAttribute: 'ar_target_id',

    type_name: 'ARTarget',

    amfphp_url_templates:
    {
      read:   "ar_targets.getARTarget",
      update: "ar_targets.updateARTarget",
      create: "ar_targets.createARTarget",
      delete: "ar_targets.deleteARTarget"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "ar_target_id",
      "name",
      "vuforia_index",
    ],

    defaults:
    {
      name: "",
      vuforia_index: "0",
    },

    thumbnail: function()
    {
      var url = "http://www.arisgames.org/server/gamedatav2/"+this.get("game_id")+"/ar/thumbs/"+this.get("name")+".jpg";
      return url;
    },
  },

  // Static
  {
  });
});

