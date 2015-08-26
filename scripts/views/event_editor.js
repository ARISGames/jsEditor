define([
  "underscore",
  'views/editor_base',
  "text!templates/event_editor.tpl",
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
      var self = this;

      var getSelectingType = function()
      {
        if(
          self.model.get("event") == "GIVE_ITEM_PLAYER" || self.model.get("event") == "GIVE_ITEM" ||
          self.model.get("event") == "TAKE_ITEM_PLAYER" || self.model.get("event") =="TAKE_ITEM" ||
          self.model.get("event") == "SET_ITEM_PLAYER" ||
          self.model.get("event") == "GIVE_ITEM_GAME" ||
          self.model.get("event") == "TAKE_ITEM_GAME" ||
          self.model.get("event") == "SET_ITEM_GAME" ||
          self.model.get("event") == "GIVE_ITEM_GROUP" ||
          self.model.get("event") == "TAKE_ITEM_GROUP" ||
          self.model.get("event") == "SET_ITEM_GROUP"
        )
          return "items";
        else if(self.model.get("event") == "SET_SCENE") return "scenes";
        else if(self.model.get("event") == "SET_GROUP") return "groups";
        else if(self.model.get("event") == "RUN_SCRIPT") return "js";
        else return "other";
      }
      return {
        items: storage.items,
        scenes: storage.scenes,
        groups: storage.groups,
        selecting_type: getSelectingType(),
      };
    },

    tagName: 'li',
    className: "list-group-item",

    initialize: function(options)
    {
      var self = this;
    },

    ui:
    {
      "event": ".event-select",
      "content": ".content-select",
      "quantity": ".quantity",
      "script": "#script",
    },

    events:
    {
      "change @ui.event":    "onChangeEvent",
      "change @ui.content":  "onChangeContent",
      "change @ui.quantity": "onChangeQuantity",
      "change @ui.script":   "onChangeScript",
      "click .delete":       "onClickDeleteEvent",
    },

    onChangeEvent: function()
    {
      var self = this;
      var value = self.ui.event.find("option:selected").val();
      self.model.set("event", value);
      self.render();
    },

    onChangeContent: function()
    {
      var self = this;
      var value = self.ui.content.find("option:selected").val();
      self.model.set("content_id", value);
    },

    onChangeQuantity: function()
    {
      var self = this;
      self.model.set("qty", self.ui.quantity.val());
    },

    onChangeScript: function()
    {
      var self = this;
      self.model.set("script", self.ui.script.val());
    },

    onClickDeleteEvent: function()
    {
      var self = this;
      self.trigger("event:remove", self.model);
    }

  });
});

