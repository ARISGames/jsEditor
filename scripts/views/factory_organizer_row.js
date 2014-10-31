define([
	'backbone',
	'text!templates/factory_organizer_row.tpl',
	'views/factory_editor',
	'models/media',
	'models/game',
	'collections/items',
	'collections/plaques',
	'collections/dialogs',
	'collections/web_pages',
	'vent'
], function(Backbone, Template, FactoryEditorView, Media, Game, ItemsCollection, PlaquesCollection, DialogsCollection, WebPagesCollection, vent) {

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
			var view = this;
			var game = new Game ({game_id:  this.model.get("game_id")});
			var icon = new Media({media_id: this.model.get("trigger_icon_media_id")});

			var contents = {
				items:      new ItemsCollection    ([], {parent: game}),
				plaques:    new PlaquesCollection  ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game})
			};

			$.when(icon.fetch(), contents.items.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.web_pages.fetch()).done(function() {
				var factory_editor = new FactoryEditorView({model: view.model, icon: icon, contents: contents});
				vent.trigger("application:popup:show", factory_editor, "Edit Factory", true);
			});

		}
	});
});
