define([
	'backbone',
	'text!templates/factory_organizer.tpl',
	'views/factory_organizer_row',
	'views/factory_editor',
	'models/factory',
	'models/media',
	'models/game',
	'collections/items',
	'collections/plaques',
	'collections/dialogs',
	'collections/web_pages',
	'vent'
], function(Backbone, Template, FactoryOrganizerRowView, FactoryEditorView, Factory, Media, Game, ItemsCollection, PlaquesCollection, DialogsCollection, WebPagesCollection, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		itemView: FactoryOrganizerRowView,
		itemViewContainer: ".factories",


		initialize: function(options) {
			var view = this;

			vent.on("factory:add", function(factory) {
				view.collection.add(factory);
			});
		},


		events: {
			"click .new": "onClickNew"
		},


		onClickNew: function() {
			var factory = new Factory({game_id: this.model.get("game_id")});
			var game    = new Game   ({game_id: this.model.get("game_id")});
			var icon    = new Media  ({media_id: factory.get("trigger_icon_media_id")});

			var contents = {
				items:      new ItemsCollection    ([], {parent: game}),
				plaques:    new PlaquesCollection  ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game})
			};

			$.when(icon.fetch(), contents.items.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.web_pages.fetch()).done(function() {
				var factory_editor = new FactoryEditorView({model: factory, icon: icon, contents: contents});
				vent.trigger("application:popup:show", factory_editor, "Create Factory");
			});
		}
	});
});
