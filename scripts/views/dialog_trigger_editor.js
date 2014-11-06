define(function(require)
{
	var vent = require('vent');

	var TriggerEditorBaseView = require('views/trigger_editor_base');
	var DialogEditorView      = require('views/dialog_editor');


	return TriggerEditorBaseView.extend({

		onClickEditGameObject: function() {
			// TODO catch media change? to update trigger if its using parent.
			var dialog_editor = new DialogEditorView({model: this.game_object});
			vent.trigger("application:popup:show", dialog_editor, "Edit Conversation");
		},

		parent_label: "Conversation",
		parent_icon: "comment"
	});
});
