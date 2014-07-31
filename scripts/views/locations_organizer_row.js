define([
	'backbone',
	'text!templates/locations_organizer_row.tpl',
	'views/trigger_location_editor',
	'vent'
], function(Backbone, Template, TriggerLocationEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEdit"
		},

		tagName: 'tr',

		modelEvents: {
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onClickEdit: function() {
			this.model.trigger("center_map");
			var location_editor = new TriggerLocationEditorView({model: this.model});
			vent.trigger("application:info:show", location_editor);
		}
	});
});
