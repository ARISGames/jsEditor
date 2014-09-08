define([
	'backbone',
	'text!templates/factory_organizer_row.tpl',
	'views/factory_editor',
	'models/media',
	'vent'
], function(Backbone, Template, FactoryEditorView, Media, vent) {

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
			var icon  = new Media({media_id: this.model.get("trigger_icon_media_id")});

			$.when(icon.fetch()).done(function() {
				var factory_editor = new FactoryEditorView({model: view.model, icon: icon});
				vent.trigger("application:popup:show", factory_editor, "Edit Factory");
			});

		}
	});
});
