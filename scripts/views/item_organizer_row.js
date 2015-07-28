define([
  'backbone',
  'text!templates/item_organizer_row.tpl',
  'views/item_editor',
  'vent',
],
function(
  Backbone,
  Template,
  ItemEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    events: {
      "click .edit": "onClickEdit"
    },

    initialize: function() {
      this.listenTo(this.model, "update", this.render);
    },

    tagName: 'tr',

    onClickEdit: function() {
      var view  = this;

      var item_editor = new ItemEditorView({model: view.model});
      vent.trigger("application:popup:show", item_editor, "Edit Item");
    }
  });
});

