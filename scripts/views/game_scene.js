define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene.tpl',
	'views/scene_info',
	'views/character_chooser',
	'views/game_scene_character',
	'collections/game_characters',
	'collections/character_instances',
	'vent'
], function($, _, Backbone, Marionette, Template, SceneInfoView, CharacterChooserView, GameSceneCharacterView, GameCharactersCollection, CharacterInstancesCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: GameSceneCharacterView,
		itemViewContainer: ".scene-items",	

		initialize: function() {
			var view = this;
			this.collection = new CharacterInstancesCollection([]);

			this.collection.fetch({
				data: { "scene_id": this.model.id },
				success: function() {
					//this.render();
				}
			});

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
			"click .title": "onClickTitle",
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

		onClickTitle: function() {
			vent.trigger("application:info:show", new SceneInfoView({model: this.model}));
		},

		onClickAddCharacter: function() {
			var scene = this.model;

			var characters = new GameCharactersCollection([], {parent: scene});

			characters.fetch({
				data: {"game_id": scene.get('game_id')},
				success: function() {
					var character_chooser = new CharacterChooserView({collection: characters, parent: scene});
					vent.trigger("application:info:show", character_chooser);
				}
			});
		}
	});
});
