define([
	'underscore',
	'backbone',
	'text!../../templates/scene.tpl',
	'views/scene_editor',
	'views/scene_instance_trigger',
	'views/scene_trigger_type_chooser',
	'collections/triggers',
	'vent'
], function(_, Backbone, Template, SceneEditorView, SceneInstanceTriggerView, SceneTriggerTypeChooserView,TriggerCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: SceneInstanceTriggerView,
		itemViewContainer: ".scene-triggers",

		initialize: function(options) {
			var view = this;

			this.game = options.game;

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

		onClickNewTrigger: function() {
			vent.trigger("application:dialog:show", new SceneTriggerTypeChooserView({model: this.model, game: this.game}), "Add to Scene");
		},

	});
});
