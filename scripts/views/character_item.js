define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/character_item.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .edit": "onClickEdit",
			"click .conversations": "onClickConversations"
		},


		onClickEdit: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/characters/"+this.model.get('npc_id')+"/edit", {trigger: true});
		},

		onClickConversations: function() {
			Backbone.history.navigate("#games/"+this.model.get('game_id')+"/characters/"+this.model.get('npc_id')+"/conversations", {trigger: true});
		}
	});
});
