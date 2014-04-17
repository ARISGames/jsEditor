define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'jqueryui',
	'bootstrap',
	'text!../../templates/character_chooser.tpl',
	'models/game_character',
	'views/character_chooser_item',
	'vent'
], function($, _, Backbone, Marionette, jQueryUi, Bootstrap, Template, GameCharacter, CharacterChooserItem, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: CharacterChooserItem,
		itemViewContainer: ".characters",
	});
});
