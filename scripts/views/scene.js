define([
	'underscore',
	'backbone',
	'text!../../templates/scene.tpl',
	'views/scene_editor',
	'views/dialog_chooser',
	'views/scene_instance_trigger',
	'collections/dialogs',
	'collections/triggers',
	'vent'
], function(_, Backbone, Template, SceneEditorView, DialogChooserView, SceneInstanceTriggerView, DialogsCollection, TriggerCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: SceneInstanceTriggerView,
		itemViewContainer: ".scene-triggers",

		initialize: function() {
			var view = this;

			this.collection = new TriggerCollection([], {parent: this.model});
			this.collection.fetch();

			// Must find cleaner way to interface this with the other view
			vent.on("scene:add_trigger", function(trigger) {
				if (view.model.id == trigger.get("scene_id"))
				{
					view.collection.add(trigger);
				}
			});
		},

		className: "scene",

		events: {
			"click .name": "onClickName",
			"click .new-trigger": "onClickNewTrigger"
		},

		/* TODO cleanest way to do this? */
		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onRender: function() {
			$(this.$el).draggable({ containment: "parent" });
		},

		onClickName: function() {
			vent.trigger("application:info:show", new SceneEditorView({model: this.model}));
		},

		onClickAddDialog: function() {
			var scene = this.model;

			var dialogs = new DialogsCollection([], {parent: this.options.game});

			dialogs.fetch({
				success: function() {
					var dialog_chooser = new DialogChooserView({collection: dialogs, parent: scene});
					vent.trigger("application:dialog:show", dialog_chooser);
				}
			});
		}
	});
});
