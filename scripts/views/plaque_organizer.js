define([
  'backbone',
  'text!templates/plaque_organizer.tpl',
  'views/plaque_organizer_row',
  'views/plaque_editor',
  'models/plaque',
  'storage',
  'vent',
],
function(
  Backbone,
  Template,
  PlaqueOrganizerRowView,
  PlaqueEditorView,
  Plaque,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: PlaqueOrganizerRowView,
    itemViewContainer: ".plaques",

    initialize: function(options)
    {
      var self = this;
    },

    events:
    {
      "click .new": "onClickNew"
    },

    onClickNew: function()
    {
      var self = this;
      var plaque  = new Plaque({game_id:storage.game.get("game_id")});

      var plaque_editor = new PlaqueEditorView({model:plaque});
      vent.trigger("application:popup:show", plaque_editor, "Create Plaque");
    },

  });
});

