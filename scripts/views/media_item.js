define([
	'underscore',
	'backbone',
	'text!templates/media_item.tpl',
], function(_, Backbone, Template) {
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
