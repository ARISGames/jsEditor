define([
	'underscore',
	'backbone',
	'text!../../templates/game_nav_menu.tpl',
	'vent'
], function(_, Backbone, Template, vent) {

	return Backbone.Marionette.ItemView.extend({
		template:  _.template(Template),

		events: {
			"click .locations": "onClickLocations",
			"click .media": "onClickMedia",
			"click .scenes": "onClickScenes"
		},

		onRender: function() {
			this.$el.find(this.options.active).parent().addClass("active");
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
