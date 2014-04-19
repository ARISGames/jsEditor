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

		events: {
			"click .show": "onClickShowCharacter",
		},

		onClickShowCharacter: function() {
			console.log("yes");
		}
	});
});
