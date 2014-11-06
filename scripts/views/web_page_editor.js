define(function(require)
{
	var _                = require('underscore');
	var $                = require('jquery');
	var Backbone         = require('backbone');
	var Template         = require('text!templates/web_page_editor.tpl');
	var MediaCollection  = require('collections/media');
	var Game             = require('models/game');
	var MediaChooserView = require('views/media_chooser');
	var vent             = require('vent');


	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		/* View */

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url: this.model.icon_thumbnail()
			}
		},


		ui: {
			"save":   ".save",
			"delete": ".delete",
			"cancel": ".cancel",

			"change_icon": ".change-icon",

			"name": "#web_page-name",
			"url":  "#web_page-url"
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

			"click @ui.change_icon": "onClickChangeIcon",

			// Field events
			"change @ui.name":  "onChangeName",
			"change @ui.url":   "onChangeUrl"
		},

		initialize: function(options) {
		},

		onClickSave: function() {
			var view   = this;
			var web_page = this.model;

			web_page.save({}, {
				create: function() {
					view.storePreviousAttributes();

					vent.trigger("game_object:add", web_page);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					view.storePreviousAttributes();

					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", web_page);
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickCancel: function() {
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

		onChangeName: function() { this.model.set("name", this.ui.name.val()); },
		onChangeUrl:  function() { this.model.set("url",  this.ui.url.val());  },


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.icon());
		},

		bindAssociations: function() {
			this.listenTo(this.model.icon(), 'change', this.render);
		},

		/* Media Selector */

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
						vent.trigger("application:popup:show", view, "Edit Conversation");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Conversation");
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
				}
			});
		},
	});
});
