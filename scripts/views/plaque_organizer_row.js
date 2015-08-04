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
      var self = this;
      self.listenTo(self.model, "update", self.render);
    },

    tagName: 'tr',

    onClickEdit: function()
    {
      var self = this;
      var plaque = self.model;
      var plaque_editor = new PlaqueEditorView({model:plaque});
      vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
    }
  });
});

