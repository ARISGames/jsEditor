define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_item.tpl',
], function($, _, Backbone, Marionette, Template) {
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
