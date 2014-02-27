define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/media_item.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'tr',


		events: {
			"click .show": "onClickShow",
		},


		onClickShow: function() {
			// manually fetch model and show full url
		},
	});
});
