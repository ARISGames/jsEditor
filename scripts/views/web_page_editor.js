define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/web_page_editor.tpl',
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
				icon_thumbnail_url:  this.icon.get("thumb_url")
			}
		},


		ui: {
			"name": "#web_page-name",
			"url":  "#web_page-url",
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
			var view   = this;
			var web_page = this.model;

			// Save Object
			web_page.set("icon_media_id", view.icon.get( "media_id"));

			web_page.set("name", view.ui.name.val());
			web_page.set("url",  view.ui.url.val());

			web_page.save({}, {
				success: function() {
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", web_page);
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
		}
	});
});
