define(function(require)
{
	var vent = require('vent');

	var TriggerEditorBaseView = require('views/trigger_editor_base');
	var WebPageEditorView     = require('views/web_page_editor');


	return TriggerEditorBaseView.extend({

		onClickEditGameObject: function() {
			var web_page_editor = new WebPageEditorView({model: this.game_object});
			vent.trigger("application:popup:show", web_page_editor, "Edit WebPage");
		},

		parent_label: "Web Page",
		parent_icon: "globe"
	});
});
