define([
	'backbone',
	'text!templates/item_organizer_row.tpl',
	'views/item_editor',
	'models/media',
	'vent'
], function(Backbone, Template, ItemEditorView, Media, vent) {

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
			var icon  = new Media({media_id: this.model.get("icon_media_id")});
			var media = new Media({media_id: this.model.get("media_id"     )});

			$.when(icon.fetch(), media.fetch()).done(function() {
				var item_editor = new ItemEditorView({model: view.model, media: media, icon: icon});
				vent.trigger("application:popup:show", item_editor, "Edit Item");
			});

		}
	});
});
