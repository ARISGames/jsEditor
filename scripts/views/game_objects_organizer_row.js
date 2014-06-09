define([
	'backbone',
	'text!../../templates/game_objects_organizer_row.tpl',
	'views/dialog_editor',
	'vent'
], function(Backbone, Template, DialogEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEditDialog"
		},

		initialize: function() {
			var view = this;
			vent.on("dialog:update", function(dialog) {
				if(dialog.id === view.model.id) {
					view.model = dialog;
					view.render();
				}
			});
		},

		tagName: 'tr',

		onClickEditDialog: function() {
			var dialog_editor = new DialogEditorView({model: this.model});
			vent.trigger("application:dialog:show", dialog_editor, "Edit Dialog");
		}
	});
});
