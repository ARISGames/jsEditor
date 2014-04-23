define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jqueryui',
	'bootstrap',
	'text!../../templates/character_chooser.tpl',
	'models/game_character',
	'models/character_instance',
	'views/character_chooser_item',
	'views/character_creator',
	'vent'
], function($, _, Backbone, Marionette, jQueryUi, Bootstrap, Template, GameCharacter, CharacterInstance, CharacterChooserItem, CharacterCreatorView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: CharacterChooserItem,
		itemViewContainer: ".characters",

		itemViewOptions: function(model, index) {
			return {
			  parent: this.options.parent
			}
		},

		events: {
			"click .new-character": "onClickNewCharacter"
		},

		/* TODO move complex sets like this into a controller */
		onClickNewCharacter: function() {
			var character          = new GameCharacter    ({game_id: this.options.parent.get("game_id")});
			var character_instance = new CharacterInstance({game_id: this.options.parent.get("game_id")});

			var character_creator  = new CharacterCreatorView({scene: this.options.parent, character: character, character_instance: character_instance});
			vent.trigger("application:info:show", character_creator);
		}
	});
});
