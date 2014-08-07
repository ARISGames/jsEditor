define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/character_editor.tpl',
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
				media_thumbnail_url:  this.media.thumbnail()
			}
		},


		ui: {
			"name":  "#character-name",
			"title": "#character-title"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-media": "onClickChangeMedia",

			// Field events
			"change @ui.name":  "onChangeName",
			"change @ui.title": "onChangeTitle",
		},

		initialize: function(options) {
			this.media = options.media;
		},

		onClickSave: function() {
			var character = this.model;

			character.save({}, {
				success: function() {
					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", character);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onChangeName:  function() { this.model.set("name",  this.ui.name.val());  },
		onChangeTitle: function() { this.model.set("title", this.ui.title.val()); },

		onClickChangeMedia: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Media */
					var media_chooser = new MediaChooserView({collection: media});

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.model.set("media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Character");
					});

					media_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Character");
					});

					vent.trigger("application:popup:show", media_chooser, "Choose Icon");
				}
			});
		}
	});
});
