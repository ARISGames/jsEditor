define(function(require)
{
	var Backbone               = require('backbone');
	var Template               = require('text!templates/plaque_organizer.tpl');
	var PlaqueOrganizerRowView = require('views/plaque_organizer_row');
	var PlaqueEditorView       = require('views/plaque_editor');
	var Plaque                 = require('models/plaque');
	var vent                   = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: PlaqueOrganizerRowView,
		itemViewContainer: ".plaques",


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var plaque  = new Plaque({game_id: this.model.get("game_id")});

			var plaque_editor = new PlaqueEditorView({model: plaque});
			vent.trigger("application:popup:show", plaque_editor, "Create Plaque");
		}
	});
});
