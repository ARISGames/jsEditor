define([
  'backbone',
  'text!templates/dialog_organizer_row.tpl',
  'views/dialog_editor',
  'vent',
],
function(
  Backbone,
  Template,
  DialogEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    events:
    {
      "click .edit": "onClickEditDialog"
    },

    initialize: function() {
      this.listenTo(this.model, "update", this.render);
    },

    tagName: 'tr',

    onClickEditDialog: function() {
      var dialog_editor = new DialogEditorView({model: this.model});
      vent.trigger("application:popup:show", dialog_editor, "Edit Conversation");
    }
  });
});

