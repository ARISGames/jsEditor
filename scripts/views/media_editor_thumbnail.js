define([
	'underscore',
	'backbone',
	'text!templates/media_editor_thumbnail.tpl',
], function(_, Backbone, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "aris-media-thumbnail",

		events: {
			"click .show": "onClickShow",
		},


		onClickShow: function() {
			// manually fetch model and show full url
		},
	});
});
