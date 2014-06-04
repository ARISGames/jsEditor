define([
	'backbone',
	'text!../../templates/dialog_chooser.tpl',
	'models/dialog',
	'models/trigger',
	'models/instance',
	'views/dialog_chooser_row',
	'views/dialog_chooser_rows_empty',
	'views/dialog_trigger_editor',
	'vent'
], function(Backbone, Template, Dialog, Trigger, Instance, DialogChooserRowView, DialogChooserRowsEmptyView, DialogTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: DialogChooserRowView,
		itemViewContainer: ".dialogs",

		emptyView: DialogChooserRowsEmptyView,

		itemViewOptions: function(model, index) {
			return {
			  parent: this.options.parent
			}
		},

		events: {
			"click .new-dialog": "onClickNewDialog"
		},

		/* TODO move complex sets like this into a controller */
		onClickNewDialog: function() {
			var dialog   = new Dialog   ({game_id: this.options.parent.get("game_id")});
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"),scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});

			var trigger_editor = new DialogTriggerEditorView({scene: this.options.parent, dialog: dialog, instance: instance, model: trigger, show_dialog_fields: true});
			vent.trigger("application:dialog:show", trigger_editor);
		}
	});
});
