define([
  'backbone',
  'text!templates/plaque_organizer_row.tpl',
  'views/plaque_editor',
  'vent',
],
function(
  Backbone,
  Template,
  PlaqueEditorView,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    events:
    {
      "click .edit": "onClickEdit"
    },

    initialize: function()
    {
      this.listenTo(this.model, "update", this.render);
    },

    tagName: 'tr',

    onClickEdit: function()
    {
      var plaque_editor = new PlaqueEditorView({model: this.model});
      vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
    }
  });
});

