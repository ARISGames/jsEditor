define([
	'backbone',
	'text!../../templates/dialog_chooser_item.tpl',
	'models/trigger',
	'models/instance',
	'views/dialog_trigger_editor',
	'vent'
], function(Backbone, Template, Trigger, Instance, DialogTriggerEditorView, vent) {

	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .new-instance": "onClickNewInstance",
		},


		// TODO how to bubble up? or get scene passed to us
		onClickNewInstance: function() {
			var trigger  = new Trigger  ({game_id: this.options.parent.get("game_id"), scene_id: this.options.parent.get("scene_id")});
			var instance = new Instance ({game_id: this.options.parent.get("game_id")});

			var trigger_editor = new DialogTriggerEditorView({scene: this.options.parent, dialog: this.model, instance: instance, model: trigger});
			vent.trigger("application:info:show", trigger_editor);
		}
	});
});

