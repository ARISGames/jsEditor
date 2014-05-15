/* FIXME This is an instance not a character */
define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene_character.tpl',
	'views/character_instance_info',
	'vent'
], function($, _, Backbone, Marionette, Template, CharacterInstanceInfo, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'li',

		templateHelpers: function () {
			return {
				name: this.model.get("character_name")
			}
		},

		events: {
			"click .show": "onClickShowCharacter",
		},

		onClickShowCharacter: function() {
			vent.trigger("application:info:show", new CharacterInstanceInfo({model: this.model}));
		}
	});
});
