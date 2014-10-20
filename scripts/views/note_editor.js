define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/note_editor.tpl',
	'collections/media',
	'collections/items',
	'models/game',
	'models/note',
	'views/media_chooser',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, ItemsCollection, Game, Note, MediaChooserView, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				url:  this.media.get('url')
			};
		},



		ui: {
			"name":        "#name",
			"description": "#description"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",

			"click .change-media": "onClickMedia",

			// Field events
			"change @ui.name":        "onChangeName",
			"change @ui.description": "onChangeDescription"
		},

		initialize: function(options) {
			this.media      = options.media;
		},

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.trigger("note:add", view.model);
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

		onChangeName:        function() { this.model.set("name",        this.ui.note.val()); },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()); },


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
					vent.trigger("application:popup:show", media_chooser, "Note Media");

					media_chooser.on("media:choose", function(media) {
						view.media = media;
						view.model.set("media_id", media.id);
						vent.trigger("application:popup:show", view, "Edit Note");
					});

					media_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Note");
					});
				}
			});
		},

		onRender: function() {
			this.switchMediaPreviewer();
		},

		switchMediaPreviewer: function() {
			this.$el.find('.media-previewer').hide();

			if     (this.media.is_video()) { this.$el.find('.video-preview').show(); }
			else if(this.media.is_audio()) { this.$el.find('.audio-preview').show(); }
			else                           { this.$el.find('.image-preview').show(); }
		}
	});
});
