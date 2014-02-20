define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/requirement_item.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .edit": "onClickEdit"
		},


		onClickEdit: function() {
			// enough information to make get call and save call
		}
	});
});
