define([
	'underscore',
	'backbone',
	'text!templates/scene.tpl',
	'views/scene_editor',
	'views/scene_instance_trigger',
	'views/scene_trigger_type_chooser',
	'views/empty_scene',
	'collections/triggers',
	'vent'
], function(_, Backbone, Template, SceneEditorView, SceneInstanceTriggerView, SceneTriggerTypeChooserView, EmptySceneView, TriggerCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		className: "panel panel-default scene-panel",

		itemView: SceneInstanceTriggerView,
		itemViewContainer: ".scene-triggers",
		emptyView: EmptySceneView,

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

			vent.on("game_object:update", function(game_object) {
				if(game_object.id === view.model.id && game_object.idAttribute === view.model.idAttribute) {
					view.model = game_object;
					view.render();
				}
			});

		},

		onItemviewTriggerRemove: function(item_view, trigger) {
			this.collection.remove(trigger);
		},

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
			vent.trigger("application:popup:show", new SceneTriggerTypeChooserView({model: this.model, game: this.game}), "Add Trigger to Scene");
		},

	});
});
