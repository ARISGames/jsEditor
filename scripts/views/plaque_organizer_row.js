define([
	'jquery',
	'backbone',
	'text!templates/plaque_organizer_row.tpl',
	'views/plaque_editor',
	'models/media',
	'vent'
], function($, Backbone, Template, PlaqueEditorView, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
		},

		tagName: 'tr',

		onClickEdit: function() {
			var view  = this;
			var icon  = new Media({media_id: this.model.get("icon_media_id")});
			var media = new Media({media_id: this.model.get("media_id"     )});

			$.when(icon.fetch(), media.fetch()).done(function() {
				var plaque_editor = new PlaqueEditorView({model: view.model, media: media, icon: icon});
				vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
			});

		}
	});
});
