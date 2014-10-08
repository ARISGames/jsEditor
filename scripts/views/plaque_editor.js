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
	'views/media_chooser',
	'views/events',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, EventsCollection, ItemsCollection, Game, EventPackage, MediaChooserView, EventsEditorView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.icon.thumbnail(),
				media_thumbnail_url: this.media.thumbnail()
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
			"click .delete": "onClickDelete",
			"click .change-icon":  "onClickChangeIcon",
			"click .change-media": "onClickChangeMedia",
			"click .edit-events": "onClickEditEvents",
			"change @ui.name": "onChangeName",
			"change @ui.description": "onChangeDescription",
		},

		initialize: function(options) {
			this.icon  = options.icon;
			this.media = options.media;
		},

		onClickSave: function() {
			var plaque = this.model;

			plaque.save({}, {
				create: function() {
					vent.trigger("plaque:add", plaque);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", plaque);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickDelete: function() {
			var view = this;
			this.model.destroy({
				success: function() {
					vent.trigger("game_object:delete", view.model);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onChangeName:        function() { this.model.set("name",        this.ui.name.val())        },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()) },


		/* Media Selectors */

		onClickChangeIcon: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media});

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Plaque");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Plaque");
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
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
					var media_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", media_chooser, "Choose Media");

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.model.set("media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Plaque");
					});

					media_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Plaque");
					});
				}
			});
		},


		/* Events Editor */

		onClickEditEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:show", view, "Edit Plaque");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("event_package_id", event_package.id);

					if(!view.model.isNew() && view.model.hasChanged("event_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"event_package_id": event_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Plaque");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		}
	});
});
