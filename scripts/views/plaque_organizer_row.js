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
			var view = this;

			vent.on("game_object:update", function(game_object) {
				if(game_object.id === view.model.id && game_object.idAttribute === view.model.idAttribute) {
					view.model = game_object;
					view.render();
				}
			});
		},

		tagName: 'tr',

		onClickEdit: function() {
			var view  = this;

			var plaque_editor = new PlaqueEditorView({model: view.model});
			vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
		}
	});
});
