define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/characters.tpl',
	'collections/characters',
	'views/character_item',
], function($, _, Backbone, Marionette, Template, CharacterCollection, CharacterItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: CharacterItemView,

	    // Bootstrap wrapper
		tagName: "table",
		className: "table",


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+"/characters/new", {trigger: true});
		}
	});
});
