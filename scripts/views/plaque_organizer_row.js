define(function(require)
{
	var Backbone         = require('backbone');
	var Template         = require('text!templates/plaque_organizer_row.tpl');
	var PlaqueEditorView = require('views/plaque_editor');
	var vent             = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		initialize: function() {
			this.listenTo(this.model, "update", this.render);
		},

		tagName: 'tr',

		onClickEdit: function() {
			var plaque_editor = new PlaqueEditorView({model: this.model});
			vent.trigger("application:popup:show", plaque_editor, "Edit Plaque");
		}
	});
});
