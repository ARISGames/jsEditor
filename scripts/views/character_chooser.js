define([
	'backbone',
	'text!../../templates/character_chooser.tpl',
	'models/character',
	'models/trigger',
	'models/instance',
	'views/character_chooser_item',
	'views/character_trigger_editor',
	'vent'
], function(Backbone, Template, Character, Trigger, Instance, CharacterChooserItemView, CharacterTriggerEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: CharacterChooserItemView,
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

			var trigger_editor = new CharacterTriggerEditorView({scene: this.options.parent, character: character, instance: instance, model: trigger});
			vent.trigger("application:info:show", trigger_editor);
		}
	});
});
