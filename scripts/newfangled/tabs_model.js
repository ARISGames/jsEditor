/*
  Tabs Model
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

  self.getMethod        = "tabs.getTab";
  self.createMethod     = "tabs.createTab";
  self.updateMethod     = "tabs.updateTab";
  self.deleteMethod     = "tabs.deleteTab";
  self.getForGameMethod = "tabs.getTabsForGame";

  self.defaultObject =
  {
    "tab_id":0,
    "game_id":0,
    "type":"MAP",
    "name":"Tab",
    "description":"",
    "icon_media_id":0,
    "content_id":0,
    "info":"",
    "requirement_root_package_id":0,
    "sort_index":0,
  };

  self.idAttribute = "tab_id";

  return self;
});

