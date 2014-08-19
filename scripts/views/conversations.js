define([
	'underscore',
	'backbone',
	'text!templates/conversations.tpl',
	'views/conversation_row',
	'vent'
], function(_, Backbone, Template, ConversationRowView, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: ConversationRowView,
		itemViewContainer: '.conversations',

		className: 'conversations-editor',

		events: {
			"click .new": "onClickNew"
		},

		onClickNew: function() {
			// Prompt for name

			// launch conversation editor
		},


		// Marionette override
		appendBuffer: function(compositeView, buffer) {
			var $container = this.getItemViewContainer(compositeView);
			$container.find(".foot").before(buffer);
		},

		appendHtml: function(compositeView, itemView, index){
			if (compositeView.isBuffering) {
			  compositeView.elBuffer.appendChild(itemView.el);
			}
			else {
			  // If we've already rendered the main collection, just
			  // append the new items directly into the element.
			  var $container = this.getItemViewContainer(compositeView);
			  $container.find(".foot").before(itemView.el);
			}
		}
	});
});
