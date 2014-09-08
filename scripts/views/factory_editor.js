define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/factory_editor.tpl',
	'collections/media',
	'models/game',
	'views/media_chooser',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, Game, MediaChooserView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.icon.thumbnail()
			}
		},


		ui: {
			"name": "#factory-name",
			"description": "#factory-description",
			"iconchooser": "#icon-chooser-container"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-icon": "onClickChangeIcon"
		},

		initialize: function(options) {
			this.icon  = options.icon;
		},

		onClickSave: function() {
			var view    = this;
			var factory = this.model;

			// Save Object
			factory.set("trigger_icon_media_id", view.icon.get( "media_id"));

			factory.set("name",        view.ui.name.val());
			factory.set("description", view.ui.description.val());

			factory.save({}, {
				create: function() {
					vent.trigger("factory:add", factory);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", factory);
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
					var icon_chooser = new MediaChooserView({collection: media});

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("trigger_icon_media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Factory");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Factory");
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
				}
			});
		}
	});
});
