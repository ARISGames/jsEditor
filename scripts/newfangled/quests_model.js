/*
  Quests Model
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

  self.getMethod        = "quests.getQuest";
  self.createMethod     = "quests.createQuest";
  self.updateMethod     = "quests.updateQuest";
  self.deleteMethod     = "quests.deleteQuest";
  self.getForGameMethod = "quests.getQuestsForGame";

  self.defaultObject =
  {
    "quest_id":0,
    "game_id":0,
    "name":"Quest",
    "description":"",
    "active_icon_media_id":0,
    "active_media_id":0,
    "active_description":"",
    "active_notification_type":"DROP_DOWN",
    "active_function":"NONE",
    "active_event_package_id":0,
    "active_requirement_root_package_id":0,
    "complete_icon_media_id":0,
    "complete_media_id":0,
    "complete_description":"",
    "complete_notification_type":"DROP_DOWN",
    "complete_function":"NONE",
    "complete_event_package_id":0,
    "complete_requirement_root_package_id":0,
    "sort_index":0,
  };

  self.idAttribute = "quest_id";

  return self;
});

