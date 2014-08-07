define([
	'underscore',
	'backbone',
	'text!templates/game_nav_menu.tpl',
	'vent'
], function(_, Backbone, Template, vent) {

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		events: {
			"click .settings":     "onClickSettings",
			"click .locations":    "onClickLocations",
			"click .quests":       "onClickQuests",
			"click .media":        "onClickMedia",
			"click .scenes":       "onClickScenes",
			"click .conversations":"onClickConversations",
		},

		// TODO replace all of these with controller actions
		//
		onRender: function() {
			this.$el.find(this.options.active).parent().addClass("active");
		},

		onClickSettings: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/edit", {trigger: true});
		},

		onClickLocations: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/locations", {trigger: true});
		},

		onClickQuests: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/quests", {trigger: true});
		},

		onClickMedia: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/media", {trigger: true});
		},

		onClickScenes: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
		},

		onClickConversations: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/conversations", {trigger: true});
		}
	});
});
