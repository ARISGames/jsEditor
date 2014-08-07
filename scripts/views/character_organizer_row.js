define([
	'backbone',
	'text!templates/character_organizer_row.tpl',
	//'views/character_editor',
	'vent'
], function(Backbone, Template, /* CharacterEditorView, */ vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		tagName: 'tr',

		// FIXME is this needed
		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onClickEdit: function() {
			//var location_editor = new CharacterEditorView({model: this.model});
			//vent.trigger("application:popup:show", location_editor);
		}
	});
});
