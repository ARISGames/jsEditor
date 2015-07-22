define([
  'models/json_base'
],
function(
  JsonBaseModel
)
{
  return JsonBaseModel.extend({
    idAttribute: 'web_hook_id',

    amfphp_url_attributes: [
      "web_hook_id"
    ],

    defaults: {
    }
  });
});

