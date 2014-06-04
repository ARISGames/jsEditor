define([
	'underscore',
	'backbone',
	'text!../../templates/scene_instance_trigger.tpl',
	'models/instance',
	'models/dialog',
	'views/dialog_trigger_editor',
	'vent'
], function(_, Backbone, Template, Instance, Dialog, DialogTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		tagName: 'li',
		className: 'scene-trigger',

		templateHelpers: function() {
			return {
				object_name: this.object_name
			}
		},

		initialize: function(options) {
			this.scene = options.scene;

			var view = this;

			view.object_name = "";

			view.instance = new Instance({instance_id: view.model.get("instance_id")});
			view.instance.fetch({
				success: function() {
					// specific object type here
					//
					view.dialog = new Dialog({dialog_id: view.instance.get("object_id")});

					// FIXME refer to global instance of object so change happens everywhere
					view.dialog.on("change", function() {
						view.object_name = view.dialog.get("name");
						view.render();
					});

					view.dialog.fetch();
				}
			});
		},

		onRender: function() {
			$(this.$el).draggable({ containment: "parent" });
		},

		events: {
			"click .show": "onClickShow"
		},

		onClickShow: function() {
			// launch based on type
			var trigger_editor = new DialogTriggerEditorView({scene: this.scene, dialog: this.dialog, instance: this.instance, model: this.model, visible_fields: "trigger"});
			vent.trigger("application:info:show", trigger_editor);
		}

	});
});
