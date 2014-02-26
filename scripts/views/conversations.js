define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/conversations.tpl',
	'collections/conversations',
	'views/conversation_item',
], function($, _, Backbone, Marionette, Template, ConversationCollection, ConversationItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ConversationItemView,
		itemViewContainer: ".itemViewContainer",

		events: {
			'click .new': 'onClickNew'
		},


		onClickNew: function() {
			Backbone.history.navigate("#games/"+this.collection.parent.get('game_id')+
			                     "/characters/"+this.collection.parent.get('npc_id')+
			               "/conversations/new", {trigger: true});
		}
	});
});
