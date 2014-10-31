define([
	'underscore',
	'backbone',
	'text!templates/media_chooser_thumbnail.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				thumb_url: this.model.thumbnail()
			}
		},

		className: "col-md-3 col-sm-4 col-xs-6 padded-small",

		events: {
			"click .choose": "onClickChoose",
		},

		onClickChoose: function() {
			this.trigger("media:choose", this.model);
		},
	});
});
