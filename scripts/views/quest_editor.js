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

				active_icon_thumbnail_url:    this.active_icon.thumbnail(),
				active_media_thumbnail_url:   this.active_media.thumbnail(),
				complete_icon_thumbnail_url:  this.complete_icon.thumbnail(),
				complete_media_thumbnail_url: this.complete_media.thumbnail(),

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
			"change @ui.active_notification_type": "onChangeActiveNotificationType",
			"change @ui.active_function":          "onChangeActiveFunction",

			"change @ui.complete_description":       "onChangeCompleteDescription",
			"change @ui.complete_notification_type": "onChangeCompleteNotificationType",
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


		/* Field Changes */

		onChangeName:        function() { this.model.set("name",        this.ui.name.val()); },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()); },

		onChangeActiveDescription:   function() { this.model.set("active_description",   this.ui.active_description.val()); },
		onChangeCompleteDescription: function() { this.model.set("complete_description", this.ui.complete_description.val()); },

		onChangeActiveNotificationType:   function() { this.model.set("active_notification_type", this.ui.active_notification_type.find("option:selected").val()) },
		onChangeCompleteNotificationType: function() { this.model.set("complete_notification_type", this.ui.complete_notification_type.find("option:selected").val()) },

		onChangeActiveFunction:   function() { this.model.set("active_function",   this.ui.active_function.find("option:selected").val()) },
		onChangeCompleteFunction: function() { this.model.set("complete_function", this.ui.complete_function.find("option:selected").val()) },

		/* Media Selection */

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


		onClickCompleteIcon: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Complete Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.complete_icon = media;
						view.model.set("complete_icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		onClickCompleteMedia: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", icon_chooser, "Complete Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.complete_media = media;
						view.model.set("complete_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		/* Event Editors */

		onClickActiveEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("active_event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("active_event_package_id", event_package.id);
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		},

		onClickCompleteEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("complete_event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("complete_event_package_id", event_package.id);
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		}


		/* Requirements Editors */
	});
});
