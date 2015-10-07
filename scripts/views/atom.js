define([
  "underscore",
  'views/editor_base',
  "text!templates/atom.tpl",
  "storage",
  "vent",
],
function(
  _,
  EditorView,
  Template,
  storage,
  vent
)
{
  return EditorView.extend(
  {
    template: _.template(Template),

    templateHelpers: function()
    {
      return {
        player_item_list_selection: this.hasPlayerItemListSelection(),
        group_item_list_selection:  this.hasGroupItemListSelection(),
        world_item_list_selection:  this.hasWorldItemListSelection(),
        action_list_selection:      this.hasActionListSelection(),

        quantity_visible: this.isQuantityVisible(),
        content_visible:  this.isContentVisible (),
        location_visible: this.isLocationVisible(),

        content_items:          this.isContentItems(),
        content_tags:           this.isContentTags(),
        content_plaques:        this.isContentPlaques(),
        content_dialogs:        this.isContentDialogs(),
        content_dialog_scripts: this.isContentDialogScripts(),
        content_web_pages:      this.isContentWebPages(),
        content_quests:         this.isContentQuests(),
        content_event_packages: this.isContentEventPackages(),

        items:          this.items,
        tags:           this.tags,
        plaques:        this.plaques,
        dialogs:        this.dialogs,
        dialog_scripts: this.dialog_scripts,
        web_pages:      this.web_pages,
        quests:         this.quests,
        event_packages: this.event_packages,

        dialogfromscriptid: function(id)
        {
          var script = storage.dialog_scripts.findWhere({"dialog_script_id":id});
          var dialog = storage.dialogs.findWhere({"dialog_id":script.get("dialog_id")});
          return dialog.get("name");
        },
        speakerfromscriptid: function(id)
        {
          var script = storage.dialog_scripts.findWhere({"dialog_script_id":id});
          if(script.get("dialog_character_id") == "0") return "You";
          var charac = storage.dialog_characters.findWhere({"dialog_character_id":script.get("dialog_character_id")});
          return charac.get("name");
        },
      };
    },

    // Bootstrap
    tagName: 'li',
    className: "list-group-item",

    initialize: function(options)
    {
      this.items          = options.contents.items;
      this.tags           = options.contents.tags;
      this.plaques        = options.contents.plaques;
      this.dialogs        = options.contents.dialogs;
      this.dialog_scripts = options.contents.dialog_scripts;
      this.web_pages      = options.contents.web_pages;
      this.quests         = options.contents.quests;
      this.event_packages = options.contents.event_packages;
    },

    ui: {
      operator:    ".boolean-operator",
      requirement: ".requirement",
      content:     ".content",
      quantity:    ".quantity",
      latitude:    ".latitude",
      longitude:   ".longitude",
      distance:    ".distance",
    },

    events:
    {
      "change @ui.operator":    "onChangeBooleanOperator",
      "change @ui.requirement": "onChangeRequirement",
      "change @ui.content":     "onChangeContent",
      "change @ui.quantity":    "onChangeQuantity",
      "change @ui.distance":    "onChangeDistance",
      "change @ui.latitude":    "onChangeLatitude",
      "change @ui.longitude":   "onChangeLongitude",
      "click .delete-atom":     "onClickDeleteAtom",
    },

    /* Model bindings */

    onChangeBooleanOperator: function()
    {
      var value = this.ui.operator.find("option:selected").val();
      var type  = this.ui.operator.find("option:selected").data("set");

      // Change requirement to one from proper dropdown.
      // only change when incompatible type. So you can switch from Has to Has not

      if(type === "player_item_list")
      {
        if(!this.hasPlayerItemListSelection())
        {
          this.model.set("requirement", "PLAYER_HAS_ITEM");
          this.model.set("content_id",  "0");
        }

      }
      else if(type === "group_item_list")
      {
        if(!this.hasGroupItemListSelection())
        {
          this.model.set("requirement", "GROUP_HAS_ITEM");
          this.model.set("content_id",  "0");
        }

      }
      else if(type === "world_item_list")
      {
        if(!this.hasWorldItemListSelection())
        {
          this.model.set("requirement", "GAME_HAS_ITEM");
          this.model.set("content_id",  "0");
        }

      }
      else if(type === "action_list")
      {
        if(!this.hasActionListSelection())
        {
          this.model.set("requirement", "PLAYER_VIEWED_DIALOG");
          this.model.set("content_id",  "0");
        }
      }
      else
      {
        throw "cant figure out how to decipher boolean combination "+value+" "+type;
      }

      this.model.set("bool_operator", value);

      this.render();
    },

    onChangeRequirement: function()
    {
      var value = this.ui.requirement.find("option:selected").val();
      this.model.set("requirement", value);

      // 0 out content ID before re-rendering select
      this.model.set("content_id", "0");
      this.render();
    },

    onChangeContent: function()
    {
      var value = this.ui.content.find("option:selected").val();
      this.model.set("content_id", value);
    },

    onChangeQuantity:  function() { this.model.set("qty",       this.ui.quantity.val ()); },
    onChangeLatitude:  function() { this.model.set("latitude",  this.ui.latitude.val ()); },
    onChangeLongitude: function() { this.model.set("longitude", this.ui.longitude.val()); },
    onChangeDistance:  function() { this.model.set("distance",  this.ui.distance.val ()); },

    onClickDeleteAtom: function()
    {
      this.trigger("atom:remove", this.model);
    },

    /* Visibility Logic */

    hasPlayerItemListSelection: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_ITEM":
        case "PLAYER_HAS_TAGGED_ITEM":
          return true;
        default:
          return false;
      }
    },

    hasGroupItemListSelection: function()
    {
      switch(this.model.get("requirement")) {
        case "GROUP_HAS_ITEM":
        case "GROUP_HAS_TAGGED_ITEM":
          return true;
        default:
          return false;
      }
    },

    hasWorldItemListSelection: function()
    {
      switch(this.model.get("requirement")) {
        case "GAME_HAS_ITEM":
        case "GAME_HAS_TAGGED_ITEM":
          return true;
        default:
          return false;
      }
    },

    hasActionListSelection: function()
    {
      return !(this.hasPlayerItemListSelection() || this.hasGroupItemListSelection() || this.hasWorldItemListSelection())
    },

    isQuantityVisible: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_ITEM":
        case "PLAYER_HAS_TAGGED_ITEM":
        case "GROUP_HAS_ITEM":
        case "GROUP_HAS_TAGGED_ITEM":
        case "GAME_HAS_ITEM":
        case "GAME_HAS_TAGGED_ITEM":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO":
        case "PLAYER_HAS_NOTE":
        case "PLAYER_HAS_NOTE_WITH_TAG":
        case "PLAYER_HAS_NOTE_WITH_LIKES":
        case "PLAYER_HAS_NOTE_WITH_COMMENTS":
        case "PLAYER_HAS_GIVEN_NOTE_COMMENTS":
          return true;
        default:
          return false;
      }
    },

    isContentVisible: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_ITEM":
        case "PLAYER_HAS_TAGGED_ITEM":
        case "GROUP_HAS_ITEM":
        case "GROUP_HAS_TAGGED_ITEM":
        case "GAME_HAS_ITEM":
        case "GAME_HAS_TAGGED_ITEM":
        case "PLAYER_VIEWED_ITEM":
        case "PLAYER_VIEWED_PLAQUE":
        case "PLAYER_VIEWED_DIALOG":
        case "PLAYER_VIEWED_DIALOG_SCRIPT":
        case "PLAYER_VIEWED_WEB_PAGE":
        case "PLAYER_HAS_COMPLETED_QUEST":
        case "PLAYER_RAN_EVENT_PACKAGE":
        case "PLAYER_HAS_RECEIVED_INCOMING_WEB_HOOK":
        case "PLAYER_HAS_NOTE_WITH_TAG":
          return true;
        default:
          return false;
      }
    },

    isLocationVisible: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_IMAGE":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_AUDIO":
        case "PLAYER_HAS_UPLOADED_MEDIA_ITEM_VIDEO":
          return true;
        default:
          return false;
      }
    },

    /* Content lists visibility logic */
    isContentItems: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_ITEM":
        case "PLAYER_VIEWED_ITEM":
        case "GROUP_HAS_ITEM":
        case "GAME_HAS_ITEM":
          return true;
        default:
          return false;
      }
    },

    isContentTags: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_TAGGED_ITEM":
        case "GROUP_HAS_TAGGED_ITEM":
        case "GAME_HAS_TAGGED_ITEM":
        case "PLAYER_HAS_NOTE_WITH_TAG":
          return true;
        default:
          return false;
      }
    },

    isContentPlaques: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_VIEWED_PLAQUE":
          return true;
        default:
          return false;
      }
    },

    isContentDialogs: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_VIEWED_DIALOG":
          return true;
        default:
          return false;
      }
    },

    isContentDialogScripts: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_VIEWED_DIALOG_SCRIPT":
          return true;
        default:
          return false;
      }
    },

    isContentWebPages: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_VIEWED_WEB_PAGE":
          return true;
        default:
          return false;
      }
    },

    isContentQuests: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_HAS_COMPLETED_QUEST":
          return true;
        default:
          return false;
      }
    },

    isContentEventPackages: function()
    {
      switch(this.model.get("requirement")) {
        case "PLAYER_RAN_EVENT_PACKAGE":
          return true;
        default:
          return false;
      }
    },

  });
});

