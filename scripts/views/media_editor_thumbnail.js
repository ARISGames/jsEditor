define([
	'underscore',
	'backbone',
	'text!templates/media_editor_thumbnail.tpl',
	'views/media_edit',
	'vent'
], function(_, Backbone, Template, MediaEditView, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				thumb_url: this.model.thumbnail()
			}
		},

		className: "col-xs-6 col-sm-4 col-md-3 col-lg-3 padded-small",

		events: {
			"click .show": "onClickShow",
		},

		modelEvents: {
			"change": "render"
		},


		onClickShow: function() {
			// side bar view
			vent.trigger("application:popup:show", new MediaEditView({model: this.model}), "Edit Media");
		},
	});
});
