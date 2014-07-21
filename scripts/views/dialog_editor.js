define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/dialog_editor.tpl',
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
				thumbnail_url: this.icon.get("thumb_url")
			}
		},


		ui: {
			"name": "#dialog-name",
			"description": "#dialog-description",
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
			this.icon = options.icon;
		},

		onClickSave: function() {
			var view   = this;
			var dialog = this.model;

			// Save Object
			dialog.set("icon_media_id", view.icon.get("media_id"));
			dialog.set("name",          view.ui.name.val());
			dialog.set("description",   view.ui.description.val());

			dialog.save({}, {
				success: function() {
					vent.trigger("dialog:update", dialog);
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
					var icon_chooser = new MediaChooserView({collection: media, el: view.ui.iconchooser});
					icon_chooser.render();

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.render();
					});
				}
			});
		}
	});
});
