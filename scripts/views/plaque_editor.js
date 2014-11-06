define(function(require)
{
	var _                = require('underscore');
	var $                = require('jquery');
	var Backbone         = require('backbone');
	var Template         = require('text!templates/plaque_editor.tpl');
	var MediaCollection  = require('collections/media');
	var EventsCollection = require('collections/events');
	var ItemsCollection  = require('collections/items');
	var Game             = require('models/game');
	var EventPackage     = require('models/event_package');
	var MediaChooserView = require('views/media_chooser');
	var EventsEditorView = require('views/events');
	var vent             = require('vent');

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		/* View */

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.model.icon_thumbnail(),
				media_thumbnail_url: this.model.media_thumbnail()
			}
		},


		ui: {
			"save":   ".save",
			"delete": ".delete",
			"cancel": ".cancel",

			"change_icon":  ".change-icon",
			"change_media": ".change-media",
			"edit_events":  ".edit-events",

			"name": "#plaque-name",
			"description":  "#plaque-description"
		},


		/* Constructor */

		initialize: function() {
			// Allow returning to original attributes
			this.storePreviousAttributes();

			// Listen to association events on media
			this.bindAssociations();

			// Handle cancel from modal X or dark area
			this.on("popup:hide", this.onClickCancel);
		},


		/* View Events */

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click @ui.save":   "onClickSave",
			"click @ui.delete": "onClickDelete",
			"click @ui.cancel": "onClickCancel",

			"click @ui.change_icon":  "onClickChangeIcon",
			"click @ui.change_media": "onClickChangeMedia",
			"click @ui.edit_events":  "onClickEditEvents",

			// Field events
			"change @ui.name": "onChangeName",
			"change @ui.description": "onChangeDescription",
		},


		/* Crud */

		onClickSave: function() {
			var view = this;
			var plaque = this.model;

			plaque.save({}, {
				create: function() {
					view.storePreviousAttributes();

					vent.trigger("game_object:add", plaque);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					view.storePreviousAttributes();

					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", plaque);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickCancel: function() {
			delete this.previous_attributes.event_package_id;
			this.model.set(this.previous_attributes);
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


		/* Field Changes */

		onChangeName:        function() { this.model.set("name",        this.ui.name.val())        },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()) },


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.icon());
			this.stopListening(this.model.media());
		},

		bindAssociations: function() {
			this.listenTo(this.model.icon(),  'change', this.render);
			this.listenTo(this.model.media(), 'change', this.render);
		},

		/* Media Selectors */

		onClickChangeIcon: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.icon(), context: view.model});

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("icon_media_id", media.id);
						view.bindAssociations();
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
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Media */
					var media_chooser = new MediaChooserView({collection: media, selected: view.model.media()});
					vent.trigger("application:popup:show", media_chooser, "Choose Media");

					media_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("media_id", media.id);
						view.bindAssociations();
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
