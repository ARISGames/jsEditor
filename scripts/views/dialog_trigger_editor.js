define(function(require)
{
	var TriggerEditorBaseView = require('views/trigger_editor_base');

	var _        = require('underscore');
	var Template = require('text!templates/dialog_trigger_editor.tpl');
	var vent     = require('vent');

	var DialogEditorView        = require('views/dialog_editor');


	return TriggerEditorBaseView.extend({
		template: _.template(Template),

		onClickEditGameObject: function() {
			// TODO catch media change? to update trigger if its using parent.
			var dialog_editor = new DialogEditorView({model: this.game_object});
			vent.trigger("application:popup:show", dialog_editor, "Edit Conversation");
		},
	});
});
