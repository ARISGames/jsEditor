define([
	'jquery',
	'backbone',
	'text!templates/web_page_organizer_row.tpl',
	'views/web_page_editor',
	'models/media',
	'vent'
], function($, Backbone, Template, WebPageEditorView, Media, vent) {

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

			$.when(icon.fetch()).done(function() {
				var web_page_editor = new WebPageEditorView({model: view.model, icon: icon});
				vent.trigger("application:popup:show", web_page_editor, "Edit Web Page");
			});

		}
	});
});
