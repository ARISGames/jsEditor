/*
  Web Pages Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'models/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "webPages.getWebPage";
  self.createMethod     = "webPages.createWebPage";
  self.updateMethod     = "webPages.updateWebPage";
  self.deleteMethod     = "webPages.deleteWebPage";
  self.getForGameMethod = "webPages.getWebPagesForGame";

  self.defaultObject =
  {
    "web_page_id":0,
    "game_id":0,
    "name":"Web Page",
    "icon_media_id":0,
    "url":"",
    "back_button_enabled":0,
  };

  self.idAttribute = "web_page_id";

  return self;
});

