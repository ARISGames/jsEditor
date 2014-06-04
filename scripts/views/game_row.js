define([
	'underscore',
	'backbone',
	'text!../../templates/game_row.tpl',
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',

		events: {
			"click .view": "onClickShow",
			"click .edit": "onClickEdit"
		},

		onClickShow: function() {
			// TODO Move this to an event ie gamelist.game.clicked
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/scenes", {trigger: true});
		},

		onClickEdit: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/edit", {trigger: true});
		}

	});
});
