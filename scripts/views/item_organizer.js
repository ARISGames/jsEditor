define([
  'backbone',
  'text!templates/item_organizer.tpl',
  'views/item_organizer_row',
  'views/item_editor',
  'models/item',
  'vent',
],
function(
  Backbone,
  Template,
  ItemOrganizerRowView,
  ItemEditorView,
  Item,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: ItemOrganizerRowView,
    itemViewContainer: ".items",

    initialize: function(options)
    {
      var self = this;
      self.storage = options.storage;
    },

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;
      var item  = new Item({game_id: self.storage.game.get("game_id")});

      var item_editor = new ItemEditorView({model: item});
      vent.trigger("application:popup:show", item_editor, "Create Item");
    },

  });
});

