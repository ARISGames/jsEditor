define(function(require)
{
	var $                = require('jquery');
	var Backbone         = require('backbone');
	var Template         = require('text!templates/plaque_organizer_row.tpl');
	var PlaqueEditorView = require('views/plaque_editor');
	var Media            = require('models/media');
	var vent             = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
			var view = this;

			vent.on("game_object:update", function(game_object) {
				if(game_object.is(view.model))
				{
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
