define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/tag_editor.tpl',
	'collections/media',
	'collections/items',
	'models/game',
	'models/tag',
	'views/media_chooser',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, ItemsCollection, Game, Tag, MediaChooserView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				media_thumbnail_url:  this.media.thumbnail(),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},
			};
		},



		ui: {
			"tag":     "#tag",
			"visible": "#visible"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",

			"click .change-media":       "onClickMedia",

			// Field events
			"change @ui.tag":     "onChangeTag",
			"change @ui.visible": "onChangeVisible"
		},

		initialize: function(options) {
			this.media      = options.media;
		},

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.trigger("tag:add", view.model);
				},

				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},


		/* Field Changes */

		onChangeTag:     function() { this.model.set("tag",     this.ui.tag.val()); },
		onChangeVisible: function() { this.model.set("visible", this.ui.visible.is(":checked") ? "1" : "0"); },


		/* Media Selection */

		onClickMedia: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Media */
					var media_chooser = new MediaChooserView({collection: media, back_view: view});
					vent.trigger("application:popup:show", media_chooser, "Tag Media");

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.model.set("media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Tag");
					});

					media_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Tag");
					});
				}
			});
		}
	});
});
