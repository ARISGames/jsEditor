define([
	'backbone',
	'text!templates/locations_organizer_row.tpl',
	'views/trigger_location_editor',
	'models/media',
	'vent'
], function(Backbone, Template, TriggerLocationEditorView, Media, vent) {

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
			var view = this;

			this.model.trigger("center_map");

			var icon = new Media({media_id: this.model.get("icon_media_id")});

			$.when(icon.fetch()).done(function () {
				var location_editor = new TriggerLocationEditorView({model: view.model, icon: icon});
				vent.trigger("application:info:show", location_editor);
			});
		}
	});
});
