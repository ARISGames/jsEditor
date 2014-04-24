define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene_character.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'li',

		templateHelpers: function () {
			return {
				//name: this.model.get("character").get("name")
				name: this.model.get("character_name")
			}
		},

		events: {
			"click .show": "onClickShowCharacter",
		},

		onClickShowCharacter: function() {
		}
	});
});
