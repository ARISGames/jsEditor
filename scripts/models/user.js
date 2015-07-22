define([
  'models/json_base'
],
function(JsonBaseModel)
{
  return JsonBaseModel.extend({
    idAttribute: 'user_id',

    amfphp_url_templates: {
      read:   "users.getUser",
      update: "users.updateUser",
      create: "users.createUser",
      delete: "users.deleteUser"
    },

    amfphp_url_attributes: [
      "game_id",
      "user_id",
      "name",
        ],

    defaults: {
      name: ""
    }
  });
});

