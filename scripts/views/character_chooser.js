define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jqueryui',
	'bootstrap',
	'text!../../templates/character_chooser.tpl',
	'models/character',
	'views/character_chooser_item',
	'views/character_creator',
	'vent'
], function($, _, Backbone, Marionette, jQueryUi, Bootstrap, Template, Character, CharacterChooserItem, CharacterCreatorView, vent) {
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
			var character = new Character ({game_id: this.options.parent.get("game_id")});
			var trigger   = new Trigger   ({game_id: this.options.parent.get("game_id")});
			var instance  = new Instance  ({game_id: this.options.parent.get("game_id")});

			var trigger_editor = new TriggerEditorView({scene: this.options.parent, character: character, instance: instance, model: trigger});
			vent.trigger("application:info:show", trigger_editor);
		}
	});
});
