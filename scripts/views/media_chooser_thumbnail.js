define([
	'underscore',
	'backbone',
	'text!templates/media_chooser_thumbnail.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "chooser-thumbnail",

		events: {
			"click .choose": "onClickChoose",
		},

		onClickChoose: function() {
			this.trigger("media:choose", this.model);
		},
	});
});
