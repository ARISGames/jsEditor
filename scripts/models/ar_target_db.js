define(
function(require)
{
  var _             = require('underscore');
  var _S            = require('underscore.string');
  var JsonBaseModel = require('models/json_base');

  return JsonBaseModel.extend(
  {
    idAttribute: 'ar_target_db_id', //bogus

    amfphp_url_templates:
    {
      read:   "ar_targets.getARTarget", //bogus
      update: "ar_targets.updateARTarget", //bogus
      create: "ar_targets.uploadARTargetDB",
      delete: "ar_targets.deleteARTarget" //bogus
    },

    amfphp_url_attributes: function()
    {
      var attribute_list =
      [
        "game_id",
        "file_name",
        "data"
      ];

      // FIXME temporary fix for optional attribute, might need to remove the fixed attribute logic and make it a white list (with non nulls) that gets sent? (make sure nothing ever needs to be nulled out)
      if(!this.get("data")) { attribute_list = _.without(attribute_list, "data"); }

      return attribute_list;
    },

    defaults:
    {
      "file_name": "",
    },
  });
});

