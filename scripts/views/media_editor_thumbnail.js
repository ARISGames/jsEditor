define([
	'underscore',
	'backbone',
	'text!templates/media_editor_thumbnail.tpl',
	'views/media_edit',
	'vent'
], function(_, Backbone, Template, MediaEditView, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		className: "aris-media-thumbnail",

		events: {
			"click .show": "onClickShow",
		},

		modelEvents: {
			"change": "render"
		},


		onClickShow: function() {
			// side bar view
			vent.trigger("application:dialog:show", new MediaEditView({model: this.model}));
		},
	});
});