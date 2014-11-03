define([
       'backbone',
       'text!templates/dialog_organizer.tpl',
       'views/dialog_organizer_row',
       'views/dialog_editor',
	   'models/dialog',
	   'models/media',
       'vent'
], function(Backbone, Template, DialogsOrganizerRowView, DialogEditorView, Dialog, Media, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: DialogsOrganizerRowView,
		itemViewContainer: ".dialogs",

		initialize: function(options) {
			var view = this;

			vent.on("dialog:add", function(dialog) {
				view.collection.add(dialog);
			});
		},

		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var dialog = new Dialog({game_id: this.model.get("game_id")});

			var dialog_editor = new DialogEditorView({model: dialog});
			vent.trigger("application:popup:show", dialog_editor, "Create Conversation");
		}
	});
});
