define(function(require)
{
	var _                = require('underscore');
	var Backbone         = require('backbone');
	var Template         = require('text!templates/character_editor.tpl');
	var MediaCollection  = require('collections/media');
	var MediaChooserView = require('views/media_chooser');
	var vent             = require('vent');


	return Backbone.Marionette.CompositeView.extend({

		/* View */

		template: _.template(Template),

		templateHelpers: function() {
			return {
				player_readonly: this.player_readonly() ? "disabled" : "",
				is_new: this.model.isNew(),
				media_thumbnail_url:  this.model.media_thumbnail()
			}
		},

		ui: {
			"name":  "#character-name",
			"title": "#character-title"
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
			"click .save": "onClickSave",
			"click .change-media": "onClickChangeMedia",

			// Field events
			"change @ui.name":  "onChangeName",
			"change @ui.title": "onChangeTitle",
		},


		/* Dom manipulation */

		player_readonly: function() {
			return this.model.get("dialog_character_id") === "0";
		},


		/* Crud */

		onClickSave: function() {
			var view = this;
			var character = this.model;

			character.save({}, {
				create: function() {
					view.storePreviousAttributes();

					vent.trigger("character:add", character);
					vent.trigger("application:popup:hide");
				},
				update: function() {
					view.storePreviousAttributes();

					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickCancel: function() {
			this.model.set(this.previous_attributes);
		},


		/* Field Changes */

		onChangeName:  function() { this.model.set("name",  this.ui.name.val());  },
		onChangeTitle: function() { this.model.set("title", this.ui.title.val()); },


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.media());
		},

		bindAssociations: function() {
			this.listenTo(this.model.media(), 'change', this.render);
		},


		/* Media Selection */

		onClickChangeMedia: function() {
			if(this.player_readonly()) { return }

			var view = this;

			var media = new MediaCollection([], {parent: this.model.game()});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Media */
					var media_chooser = new MediaChooserView({collection: media, selected: view.model.media()});

					media_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("media_id", media.id);
						view.bindAssociations();
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
