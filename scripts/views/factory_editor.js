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
				icon_thumbnail_url:  this.icon.thumbnail(),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},
			}
		},


		ui: {
			"name": "#factory-name",
			"description": "#factory-description",
			"iconchooser": "#icon-chooser-container"
		},

		onShow: function() {
			this.onChangeTriggerEnter();

			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-icon": "onClickChangeIcon",
			"change @ui.name": "onChangeName",
			"change @ui.description": "onChangeDescription",
			"change input[name='factory-trigger_on_enter']": "onChangeTriggerEnter"
		},

		initialize: function(options) {
			this.icon  = options.icon;
		},

		onClickSave: function() {
			var view    = this;
			var factory = this.model;

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


		/* Field changes */

		onChangeName:        function() { this.model.set("name",        this.ui.name.val())        },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()) },


		onChangeTriggerEnter: function() {
			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=factory-trigger_on_enter]:checked");

			this.model.set("trigger_on_enter", selected_radio.val());

			this.$el.find("input[name=factory-trigger_on_enter]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.$el.find('.enter-trigger-tab').hide();

			var display_tab = "#" + selected_radio.val() + "-fields";
			$(display_tab).show();
		},

		/* Icon Selection */

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


		/* Requirements Editor */
	});
});
