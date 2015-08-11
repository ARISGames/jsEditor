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
    idAttribute: 'group_id',

    type_name: 'Group',

    amfphp_url_templates:
    {
      read:   "groups.getGroup",
      update: "groups.updateGroup",
      create: "groups.createGroup",
      delete: "groups.deleteGroup",
    },

    amfphp_url_attributes:
    [
      "group_id",
      "game_id",
      "name",
      "description",
    ],

    defaults:
    {
      name: "",
      description: "",
    },

  });
});

