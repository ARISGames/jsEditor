define(function(require)
{
	var vent = require('vent');

	var TriggerEditorBaseView = require('views/trigger_editor_base');
	var ItemEditorView        = require('views/item_editor');


	return TriggerEditorBaseView.extend({

		onClickEditGameObject: function() {
			var item_editor = new ItemEditorView({model: this.game_object});
			vent.trigger("application:popup:show", item_editor, "Edit Item");
		},

		parent_label: "Item",
		parent_icon: "stop"
	});
});
