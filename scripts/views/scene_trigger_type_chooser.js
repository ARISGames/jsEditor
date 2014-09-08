define([
	'underscore',
	'backbone',
	'text!templates/scene_trigger_type_chooser.tpl',
	'views/scene_instance_trigger',
	'views/dialog_chooser',
	'views/item_chooser',
	'views/plaque_chooser',
	'views/web_page_chooser',
	'views/scene_chooser',
	'collections/dialogs',
	'collections/items',
	'collections/plaques',
	'collections/web_pages',
	'collections/scenes',
	'vent'
], function(_, Backbone, Template,
	SceneInstanceTriggerView,
	DialogChooserView, ItemChooserView, PlaqueChooserView, WebPageChooserView, SceneChooserView,
	DialogsCollection, ItemsCollection, PlaquesCollection, WebPagesCollection, ScenesCollection,
	vent) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		events: {
			"click .add-dialog":   "onClickAddDialog",
			"click .add-plaque":   "onClickAddPlaque",
			"click .add-web-page": "onClickAddWebPage",
			"click .add-item":     "onClickAddItem",
			"click .add-scene":    "onClickAddScene"
		},

		initialize: function(options) {
			this.game = options.game;
		},

		onClickAddDialog: function() {
			var scene = this.model;

			var dialogs = new DialogsCollection([], {parent: this.game});

			dialogs.fetch({
				success: function() {
					var dialog_chooser = new DialogChooserView({collection: dialogs, parent: scene});
					vent.trigger("application:popup:show", dialog_chooser, "Add Conversation to Scene");
				}
			});
		},

		onClickAddItem: function() {
			var scene = this.model;

			var items = new ItemsCollection([], {parent: this.game});

			items.fetch({
				success: function() {
					var item_chooser = new ItemChooserView({collection: items, parent: scene});
					vent.trigger("application:popup:show", item_chooser, "Add Item to Scene");
				}
			});
		},

		onClickAddPlaque: function() {
			var scene = this.model;

			var plaques = new PlaquesCollection([], {parent: this.game});

			plaques.fetch({
				success: function() {
					var plaque_chooser = new PlaqueChooserView({collection: plaques, parent: scene});
					vent.trigger("application:popup:show", plaque_chooser, "Add Plaque to Scene");
				}
			});
		},

		onClickAddWebPage: function() {
			var scene = this.model;

			var web_pages = new WebPagesCollection([], {parent: this.game});

			web_pages.fetch({
				success: function() {
					var web_page_chooser = new WebPageChooserView({collection: web_pages, parent: scene});
					vent.trigger("application:popup:show", web_page_chooser, "Add Web Page to Scene");
				}
			});
		},

		onClickAddScene: function() {
			var scene = this.model;

			var scenes = new ScenesCollection([], {parent: this.game});

			scenes.fetch({
				success: function() {
					var scene_chooser = new SceneChooserView({collection: scenes, parent: scene});
					vent.trigger("application:popup:show", scene_chooser, "Add Scene Switch to Scene");
				}
			});
		}
	});
});
