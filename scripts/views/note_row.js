define([
	'underscore',
	'backbone',
	'text!templates/note_row.tpl',
	'views/note_editor',
	'models/media',
	'vent'
], function(_, Backbone, Template, NoteEditorView, Media, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var view = this;

			var media = new Media({media_id: this.model.get("media_id")});

			$.when(media.fetch()).done(function()
			{
				var note_editor = new NoteEditorView({model: view.model, media: media});
				vent.trigger("application:popup:show", note_editor, "Edit Note");
			});
		}

	});
});
