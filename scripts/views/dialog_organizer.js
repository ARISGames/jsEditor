define([
  'backbone',
  'text!templates/dialog_organizer.tpl',
  'views/dialog_organizer_row',
  'views/dialog_editor',
  'newfangled/dialogs_model',
  'storage',
  'vent',
],
function(
  Backbone,
  Template,
  DialogsOrganizerRowView,
  DialogEditorView,
  DialogsModel,
  storage,
  vent
)
{
  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: DialogsOrganizerRowView,
    itemViewContainer: ".dialogs",

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
      var dialog = DialogsModel.genMember();
      dialog.game_id = storage.game.get("game_id");

      var dialog_editor = new DialogEditorView({model:dialog});
      vent.trigger("application:popup:show", dialog_editor, "Create Conversation");
    },

  });
});

