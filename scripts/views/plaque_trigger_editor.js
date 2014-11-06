define(function(require)
{
	var vent     = require('vent');

	var TriggerEditorBaseView = require('views/trigger_editor_base');
	var PlaqueEditorView      = require('views/plaque_editor');

	return TriggerEditorBaseView.extend({

		onClickEditGameObject: function() {
			var plaque_editor = new PlaqueEditorView({model: this.game_object});
			vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
		},

		parent_label: "Plaque",
		parent_icon: "align-justify"
	});
});
