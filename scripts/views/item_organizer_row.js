define([
	'backbone',
	'text!templates/item_organizer_row.tpl',
	'views/item_editor',
	'models/media',
	'vent'
], function(Backbone, Template, ItemEditorView, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
		},

		tagName: 'tr',

		onClickEdit: function() {
		}
	});
});
