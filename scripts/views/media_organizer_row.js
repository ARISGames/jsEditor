define([
	'backbone',
	'text!templates/media_organizer_row.tpl',
	'views/media_edit',
	'vent'
], function(Backbone, Template, MediaEditView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEditDialog"
		},

		initialize: function() {
			var view = this;
			vent.on("media:update", function(media) {
				if(media.id === view.model.id) {
					view.model = media;
					view.render();
				}
			});
		},

		tagName: 'tr',

		onClickEditDialog: function() {
			vent.trigger("application:popup:show", new MediaEditView({model: this.model}));
		}
	});
});
