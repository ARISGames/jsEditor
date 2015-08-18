define([
  'underscore',
  'backbone',
  'text!templates/tab_row.tpl',
  'vent',
  'views/tab_editor',
  'models/tab',
  'models/web_page',
  'collections/web_pages',
],
function(
  _,
  Backbone,
  Template,
  vent,
  TabEditorView,
  Tab
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    tagName: 'a',
    className: "list-group-item draggable-game-tab",

    events:
    {
      "click": "onClickEdit"
    },

    modelEvents:
    {
      "change": "render"
    },

    templateHelpers: function()
    {
      var self = this;
      return {
        display_type:self.should_display_type(),
        tab_type:self.model.tab_type_name(),
        tab_name:self.tab_name()
      }
    },

    should_display_type: function()
    {
      var self = this;
      return (self.model.get("name") || self.model.get("content_id") !== "0") && self.model.get("name") !== self.model.tab_type_name();
    },

    tab_name: function()
    {
      var self = this;
      return self.model.get("name") || self.tab_object_name() || "(unnamed tab)"
    },

    tab_object_name: function()
    {
      var self = this;
      if(self.model.get("content_id") === "0") return self.model.tab_type_name()           || "(no type set)";
      if(self.model.game_object())             return self.model.game_object().get("name") || "(unnamed object)";
      return "(n/a)";
    },

    initialize: function()
    {
      var self = this;

      self.listenTo(vent, 'tabrow:released', self.onRowReleased.bind(self));
    },

    onClickEdit: function()
    {
      var self = this;

      var tab_editor = new TabEditorView({model:self.model, contents:contents});
      vent.trigger("application:popup:show", tab_editor, "Edit Tab");
    },

    onRowReleased: function(element, position)
    {
      var self = this;
      if(self.$el.is(element))
      {
        self.model.save({"sort_index": position}, {patch: true});
      }
    }
  });
});

