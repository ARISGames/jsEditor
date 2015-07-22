define([
  'models/json_base'
],
function(JsonBaseModel)
{
  return JsonBaseModel.extend(
  {
    idAttribute: 'user_id',

    amfphp_url_templates:
    {
      read:   "",
      update: "editors.addEditorToGame",
      create: "",
      delete: "editors.removeEditorFromGame"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "user_id"
    ],

    defaults: {
      display_name: "",
      username: ""
    }
  });
});

