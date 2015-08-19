/*
  Web Pages Model
  Takes instantiated aris_model object, and hijacks config attributes.
  Include/Require returns an instantiated object.
*/

define([
  'underscore',
  'newfangled/aris_model',
],
function(
  _,
  aris_model
)
{
  var self = _.clone(aris_model);

  self.getMethod        = "web_pages.getWebPage";
  self.createMethod     = "web_pages.createWebPage";
  self.updateMethod     = "web_pages.updateWebPage";
  self.deleteMethod     = "web_pages.deleteWebPage";
  self.getForGameMethod = "web_pages.getWebPagesForGame";

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

