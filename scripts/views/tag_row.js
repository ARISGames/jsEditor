define([
	'underscore',
	'backbone',
	'text!templates/tag_row.tpl',
	'views/tag_editor',
	'models/media',
	'vent'
], function(_, Backbone, Template, TagEditorView, Media, vent) {
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
				var tag_editor = new TagEditorView({model: view.model, media: media});
				vent.trigger("application:popup:show", tag_editor, "Edit Tag");
			});
		}

	});
});
