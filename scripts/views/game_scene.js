define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene.tpl',
	'views/scene_info',
	'views/character_chooser',
	'collections/game_characters',
	'vent'
], function($, _, Backbone, Marionette, Template, SceneInfoView, CharacterChooser, GameCharactersCollection, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

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
					var character_chooser = new CharacterChooser({collection: characters, parent: scene});
					vent.trigger("application:info:show", character_chooser);
				}
			});
		}
	});
});
