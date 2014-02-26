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
		},


		onClickNew: function() {
		}
	});
});
