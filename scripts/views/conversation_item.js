define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/conversation_item.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
		},


		onClickEdit: function() {
		}
	});
});
