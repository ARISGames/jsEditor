define([
	'underscore',
	'backbone',
	'text!../../templates/game_nav_menu.tpl',
	'vent'
], function(_, Backbone, Template, vent) {

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		events: {
			"click .plaques":    "onClickPlaques",
			"click .items":      "onClickItems",
			"click .characters": "onClickCharacters",
			"click .quests":     "onClickQuests",
			"click .locations":  "onClickLocations",
			"click .medialist":  "onClickMedia",
			"click .scenelist":     "onClickScenes"
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
		},

		onClickMedia: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/media", {trigger: true});
		},

		onClickScenes: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
		}
	});
});
