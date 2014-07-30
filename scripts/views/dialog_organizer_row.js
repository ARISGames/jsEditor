define([
	'backbone',
	'text!templates/dialog_organizer_row.tpl',
	'views/dialog_editor',
	'models/media',
	'vent'
], function(Backbone, Template, DialogEditorView, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .edit": "onClickEditDialog"
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

		onClickEditDialog: function() {
			var view = this;
			var icon = new Media({media_id: this.model.get("icon_media_id")});

			icon.fetch({
				success: function() {
					var dialog_editor = new DialogEditorView({model: view.model, icon: icon});
					vent.trigger("application:popup:show", dialog_editor, "Edit Dialog");
				}
			});
		}
	});
});
