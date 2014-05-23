define([
	'underscore',
	'backbone',
	'text!../../templates/scene.tpl',
	'views/scene_info',
	'views/character_chooser',
	'views/scene_instance_trigger',
	'collections/characters',
	'collections/triggers',
	'vent'
], function(_, Backbone, Template, SceneInfoView, CharacterChooserView, SceneInstanceTriggerView, CharactersCollection, TriggerCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: SceneInstanceTriggerView,
		itemViewContainer: ".scene-items",

		initialize: function() {
			var view = this;

			this.collection = new TriggerCollection([], {parent: this.model});
			this.collection.fetch();

			// Must find cleaner way to interface this with the other view
			vent.on("scene:add_instance", function(instance) {
				if (view.model.id == instance.get("scene_id"))
				{
					view.collection.add(instance);
				}
			});
		},

		className: "scene",

		events: {
			"click .name": "onClickName",
			"click .add-character": "onClickAddCharacter"
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
			vent.trigger("application:info:show", new SceneInfoView({model: this.model}));
		},

		onClickAddCharacter: function() {
			var scene = this.model;

			var characters = new CharactersCollection([], {parent: this.options.game});

			characters.fetch({
				success: function() {
					var character_chooser = new CharacterChooserView({collection: characters, parent: scene});
					vent.trigger("application:info:show", character_chooser);
				}
			});
		}
	});
});
