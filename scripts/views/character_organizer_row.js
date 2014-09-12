define([
	'jquery',
	'backbone',
	'text!templates/character_organizer_row.tpl',
	'views/character_editor',
	'models/media',
	'vent'
], function($, Backbone, Template, CharacterEditorView, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		tagName: 'tr',

		// FIXME is this needed (especially if we live bind attributes and need cancel)
		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onClickEdit: function() {
			var view = this;

			var media = new Media({media_id: this.model.get("media_id")});

			$.when(media.fetch()).done(function()
			{
				var character_editor = new CharacterEditorView({model: view.model, media: media});
				vent.trigger("application:popup:show", character_editor, "Edit Character");
			});
		}
	});
});
