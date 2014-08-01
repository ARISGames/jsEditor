define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/quest_editor.tpl',
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

				active_icon_thumbnail_url: this.active_icon.get("thumb_url"),
				active_media_thumbnail_url: this.active_media.get("thumb_url"),
				complete_icon_thumbnail_url: this.complete_icon.get("thumb_url"),
				complete_media_thumbnail_url: this.complete_media.get("thumb_url"),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				}
			};
		},


		ui: {
			"name": "#name",
			"description": "#description",

			"active_description":"#active-description",
			"active_notification_type":"#active-notification-type",
			"active_function":"#active-function",

			"complete_description":"#complete-description",
			"complete_notification_type":"#complete-notification-type",
			"complete_function":"#complete-function",
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save": "onClickSave",

			"click .change-active-icon":    "onClickActiveIcon",
			"click .change-active-media":   "onClickActiveMedia",
			"click .change-complete-icon":  "onClickCompleteIcon",
			"click .change-complete-media": "onClickCompleteMedia",

			"click .edit-active-requirements":   "onClickActiveRequirements",
			"click .edit-active-events":         "onClickActiveEvents",
			"click .edit-complete-requirements": "onClickCompleteRequirements",
			"click .edit-complete-events":       "onClickCompleteEvents",

			// Field events
			"change @ui.name":        "onChangeName",
			"change @ui.description": "onChangeDescription",

			"change @ui.active_description":       "onChangeActiveDescription",
			"change @ui.active_notification_type": "onChangeActiveNotification_type",
			"change @ui.active_function":          "onChangeActiveFunction",

			"change @ui.complete_description":       "onChangeCompleteDescription",
			"change @ui.complete_notification_type": "onChangeCompleteNotification_type",
			"change @ui.complete_function":          "onChangeCompleteFunction"
		},

		initialize: function(options) {
			this.active_icon    = options.active_icon;
			this.active_media   = options.active_media;
			this.complete_icon  = options.complete_icon;
			this.complete_media = options.complete_media;
		},

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.trigger("quest:add", view.model);
				},

				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickActiveIcon: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Start Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.active_icon = media;
						view.model.set("active_icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		onClickActiveMedia: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", icon_chooser, "Start Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.active_media = media;
						view.model.set("active_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		onClickActiveEvents: function() {
			var view = this;

			// Create event package when id === 0
			if(this.model.get("active_event_package_id") === "0")
			{
				// create it
				var event_package = new EventPackage({game_id: view.model.get("game_id")});

				var game  = new Game({game_id: view.model.get("game_id")});
				var items = new ItemsCollection([], {parent: game});

				$.when(items.fetch(), event_package.save()).done(function()
				{
						view.model.set("active_event_package_id", event_package.get("event_package_id"));
						view.model.save();

						// launch editor
						var events = new EventsCollection([], {parent: event_package});
						var events_editor = new EventsEditorView({model: event_package, collection: events, items: items, back_view: view});
						vent.trigger("application:popup:show", events_editor, "Modify Player on Start Quest");
				});
			}
			// grab collection and launch
			else
			{
				var event_package = new EventPackage({event_package_id: view.model.get("active_event_package_id"), game_id: view.model.get("game_id")});
				var events = new EventsCollection([], {parent: event_package});

				var game   = new Game({game_id: view.model.get("game_id")});
				var items  = new ItemsCollection([], {parent: game});

				$.when(items.fetch(), events.fetch()).done(function ()
				{
					var events_editor = new EventsEditorView({model: event_package, collection: events, items: items, back_view: view});
					vent.trigger("application:popup:show", events_editor, "Modify Player on Complete Quest");
				});

			}
		}
	});
});
