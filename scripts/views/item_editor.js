define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/item_editor.tpl',
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
				icon_thumbnail_url:  this.icon.get("thumb_url"),
				media_thumbnail_url: this.media.get("thumb_url")
			}
		},


		ui: {
			"name": "#item-name",
			"description":  "#item-description",
			"iconchooser":  "#icon-chooser-container",
			"mediachooser": "#media-chooser-container"
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
			this.media = options.media;
		},

		onClickSave: function() {
			var view   = this;
			var item = this.model;

			// Save Object
			item.set("icon_media_id", view.icon.get( "media_id"));
			item.set("media_id",      view.media.get("media_id"));

			item.set("name",          view.ui.name.val());
			item.set("description",   view.ui.description.val());

			item.save({}, {
				success: function() {
					// FIXME get rid of global update broadcasts for models
					vent.trigger("item:update", item);
					vent.trigger("application:dialog:hide");
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

					/* Media */
					var media_chooser = new MediaChooserView({collection: media, el: view.ui.mediachooser});
					media_chooser.render();

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.render();
					});
				}
			});
		}
	});
});
