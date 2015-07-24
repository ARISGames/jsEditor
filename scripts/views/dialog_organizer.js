define(
function(require)
{
  var Backbone                = require('backbone');
  var Template                = require('text!templates/dialog_organizer.tpl');
  var DialogsOrganizerRowView = require('views/dialog_organizer_row');
  var DialogEditorView        = require('views/dialog_editor');
  var Dialog                  = require('models/dialog');
  var vent                    = require('vent');

  return Backbone.Marionette.CompositeView.extend(
  {
    template: _.template(Template),

    itemView: DialogsOrganizerRowView,
    itemViewContainer: ".dialogs",

    events: {
      "click .new": "onClickNew"
    },

    onClickNew: function() {
      var dialog = new Dialog({game_id: this.model.get("game_id")});

      var dialog_editor = new DialogEditorView({model: dialog});
      vent.trigger("application:popup:show", dialog_editor, "Create Conversation");
    }
  });
});

