define([
	'backbone',
	'text!templates/locations_organizer_row.tpl',
	'views/dialog_trigger_location_editor',
	'vent'
], function(Backbone, Template, DialogTriggerLocationEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEditDialog"
		},

		tagName: 'tr',

		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onClickEditDialog: function() {
			this.model.trigger("center_map");
			var dialog_location_editor = new DialogTriggerLocationEditorView({model: this.model});
			vent.trigger("application:info:show", dialog_location_editor);
		}
	});
});
