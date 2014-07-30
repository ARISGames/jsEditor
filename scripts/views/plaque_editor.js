define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/plaque_editor.tpl',
	'collections/media',
	'collections/events',
	'collections/items',
	'models/game',
	'models/event_package',
	'models/event',
	'views/media_chooser',
	'views/events',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, EventsCollection, ItemsCollection, Game, EventPackage, Event, MediaChooserView, EventsEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.icon.get("thumb_url"),
				media_thumbnail_url: this.media.get("thumb_url")
			}
		},


		ui: {
			"name": "#plaque-name",
			"description":  "#plaque-description",
			"iconchooser":  "#icon-chooser-container",
			"mediachooser": "#media-chooser-container"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-icon":  "onClickChangeIcon",
			"click .change-media": "onClickChangeMedia",
			"click .edit-events": "onClickEditEvents"
		},

		initialize: function(options) {
			this.icon  = options.icon;
			this.media = options.media;
		},

		onClickSave: function() {
			var view   = this;
			var plaque = this.model;

			// Save Object
			plaque.set("icon_media_id", view.icon.get( "media_id"));
			plaque.set("media_id",      view.media.get("media_id"));

			plaque.set("name",          view.ui.name.val());
			plaque.set("description",   view.ui.description.val());

			plaque.save({}, {
				success: function() {
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", plaque);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickChangeIcon: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, el: view.ui.iconchooser});
					icon_chooser.render();

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.render();
					});
				}
			});
		},

		onClickChangeMedia: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Media */
					var media_chooser = new MediaChooserView({collection: media, el: view.ui.mediachooser});
					media_chooser.render();

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.render();
					});
				}
			});
		},


		onClickEditEvents: function() {
			var view = this;

			// Create event package when id === 0
			if(this.model.get("event_package_id") === "0")
			{
				// create it
				var event_package = new EventPackage({game_id: view.model.get("game_id")});

				var game  = new Game({game_id: view.model.get("game_id")});
				var items = new ItemsCollection([], {parent: game});

				$.when(items.fetch(), event_package.save()).done(function()
				{
						view.model.set("event_package_id", event_package.get("event_package_id"));
						view.model.save();

						// launch editor
						var events = new EventsCollection([], {parent: event_package});
						var events_editor = new EventsEditorView({model: event_package, collection: events, items: items, back_view: view});
						vent.trigger("application:popup:show", events_editor, "Player Inventory Events Editor");
				});
			}
			// grab collection and launch
			else
			{
				var event_package = new EventPackage({event_package_id: view.model.get("event_package_id"), game_id: view.model.get("game_id")});
				var events = new EventsCollection([], {parent: event_package});

				var game   = new Game({game_id: view.model.get("game_id")});
				var items  = new ItemsCollection([], {parent: game});

				$.when(items.fetch(), events.fetch()).done(function ()
				{
					var events_editor = new EventsEditorView({model: event_package, collection: events, items: items, back_view: view});
					vent.trigger("application:popup:show", events_editor, "Player Inventory Events Editor");
				});

			}
		}
	});
});
