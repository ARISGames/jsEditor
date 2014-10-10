define([
	'underscore',
	'backbone',
	'text!templates/tab_row.tpl',
	'views/tab_editor',
	'models/media',
	'vent'
], function(_, Backbone, Template, TabEditorView, Media, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// Bootstrap
		tagName: 'a',
		className: "list-group-item",

		events: {
			"click .edit": "onClickEdit"
		},

		modelEvents: {
			"change": "render"
		},

		onClickEdit: function() {
			var view = this;

			var icon = new Media({media_id: this.model.get("icon_media_id")});

			$.when(icon.fetch()).done(function()
			{
				var tab_editor = new TabEditorView({model: view.model, icon: icon});
				vent.trigger("application:popup:show", tab_editor, "Edit Tab");
			});
		}

	});
});
