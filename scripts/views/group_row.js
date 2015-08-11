define([
  'underscore',
  'backbone',
  'text!templates/group_row.tpl',
  'vent',
  'views/group_editor',
  'models/media',
  'models/game',
  'models/group',
],
function(
  _,
  Backbone,
  Template,
  vent,
  GroupEditorView,
  Media,
  Game,
  Group
)
{
  return Backbone.Marionette.ItemView.extend(
  {
    template: _.template(Template),

    tagName: 'a',
    className: "list-group-item draggable-game-group",

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
        group_name: self.group_name()
      }
    },

    group_name: function()
    {
      var self = this;
      return self.model.get("name") || self.group_object_name() || "(unnamed group)"
    },

    initialize: function()
    {
      var self = this;
      self.listenTo(vent, 'grouprow:released', self.onRowReleased.bind(self));
    },

    onClickEdit: function()
    {
      var self = this;

      var game = self.model.game();
      var group_editor = new GroupEditorView({model:self.model});
      vent.trigger("application:popup:show", group_editor, "Edit Group");
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

