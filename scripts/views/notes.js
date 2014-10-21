define([
	'underscore',
	'backbone',
	'text!templates/notes.tpl',
	'views/note_row',
	'views/note_editor',
	'models/note',
	'models/media',
	'vent'
], function(_, Backbone, Template, NoteRowView, NoteEditorView, Note, Media, vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: NoteRowView,
		itemViewContainer: '.notes',

		className: 'notes-editor',

		ui: {
			search_text: "#note-search-text"
		},

		events:
		{
			"click .search-notes": "onClickSearch"
		},

		onClickSearch: function()
		{
			this.collection.fetch({
				data: {search_text: this.ui.search_text.val()}
			});
		}
	});
});
