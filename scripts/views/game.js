define([
	'module',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game.tpl',
	'vent'
], function(module, $, _, Backbone, Marionette, Template, vent) {
    console.log(module.id);

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),
	
		events: {
			"click .plaques":    "onClickPlaques",
			"click .items":      "onClickItems",
			"click .characters": "onClickCharacters",
			"click .quests":     "onClickQuests",
			"click .locations":  "onClickLocations"
		},

		onClickPlaques: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/plaques", {trigger: true});
		},

		onClickItems: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/items", {trigger: true});
		},

		onClickCharacters: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/characters", {trigger: true});
		},

		onClickQuests: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/quests", {trigger: true});
		},

		onClickLocations: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/locations", {trigger: true});
		}
	});
});
