define([
  'backbone',
  'text!templates/plaque_organizer.tpl',
  'views/plaque_organizer_row',
  'views/plaque_editor',
  'models/plaque',
  'vent',
],
function(
  Backbone,
  Template,
  PlaqueOrganizerRowView,
  PlaqueEditorView,
  Plaque,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: PlaqueOrganizerRowView,
    itemViewContainer: ".plaques",

    events: {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var plaque  = new Plaque({game_id: this.model.get("game_id")});

      var plaque_editor = new PlaqueEditorView({model: plaque});
      vent.trigger("application:popup:show", plaque_editor, "Create Plaque");
    }
  });
});

