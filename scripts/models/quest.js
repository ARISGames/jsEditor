define(
function(require)
{
  var JsonBaseModel = require('models/json_base');
  var storage       = require('storage');

  return JsonBaseModel.extend(
  {
    idAttribute: 'quest_id',

    amfphp_url_templates:
    {
      read:   "quests.getQuest",
      update: "quests.updateQuest",
      create: "quests.createQuest",
      delete: "quests.deleteQuest"
    },

    amfphp_url_attributes:
    [
      "game_id",
      "quest_id",
      "name",
      "description",
      "quest_type",
      "active_icon_media_id",
      "active_media_id",
      "active_description",
      "active_notification_type",
      "active_function",
      "active_event_package_id",
      "active_requirement_root_package_id",
      "complete_icon_media_id",
      "complete_media_id",
      "complete_description",
      "complete_notification_type",
      "complete_function",
      "complete_event_package_id",
      "complete_requirement_root_package_id",
      "parent_quest_id",
    ],

    defaults:
    {
      name: "",
      description: "",
      quest_type: "QUEST",
      active_description: "",
      active_icon_media_id: "0",
      active_media_id: "0",
      active_notification_type: "NONE",
      active_function: "NONE",
      active_event_package_id: "0",
      active_requirement_root_package_id: "0",
      complete_description: "",
      complete_icon_media_id: "0",
      complete_media_id: "0",
      complete_notification_type: "NONE",
      complete_function: "NONE",
      complete_event_package_id: "0",
      complete_requirement_root_package_id: "0",
      parent_quest_id: "0"
    },

    active_icon:    function() { return storage.media.retrieve(this.get('active_icon_media_id')); },
    active_media:   function() { return storage.media.retrieve(this.get('active_media_id')); },
    complete_icon:  function() { return storage.media.retrieve(this.get('complete_icon_media_id')); },
    complete_media: function() { return storage.media.retrieve(this.get('complete_media_id')); },
    default_icon:   function() { return storage.media.retrieve('0'); },
    active_icon_thumbnail:    function() { return this.active_icon().thumbnail_for(this); },
    active_media_thumbnail:   function() { return this.active_media().thumbnail_for(); },
    complete_icon_thumbnail:  function() { return this.complete_icon().thumbnail_for(this); },
    complete_media_thumbnail: function() { return this.complete_media().thumbnail_for(); }

  },

  // Static
  {
    function_types:
    {
      'NONE':       'None',
      'MAP':        'Map',
      'DECODER':    'Decoder',
      'SCANNER':    'Scanner',
      'QUESTS':     'Quests',
      'INVENTORY':  'Inventory',
      'PLAYER':     'Player',
      'NOTEBOOK':   'Notebook',
      'PICKGAME':   'Game List',
      'JAVASCRIPT': 'Javascript'
    }
  });
});

