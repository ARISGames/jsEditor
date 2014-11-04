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

		/* View */

		templateHelpers: function()
		{
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.model.icon_thumbnail(),
				media_thumbnail_url: this.model.media_thumbnail(),

				is_checked: function(value)
				{
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},
			}
		},


		ui:
		{
			"save":   ".save",
			"delete": ".delete",
			"cancel": ".cancel",

			"change_icon":  ".change-icon",
			"change_media": ".change-media",

			"name":        "#item-name",
			"description": "#item-description",
			"url":         "#item-url",
			"droppable":   "#item-droppable",
			"destroyable": "#item-destroyable",
			"weight":      "#item-weight",

			"max_qty_in_inventory": "#item-max_qty_in_inventory"
		},


		/* Constructor */

		initialize: function() {
			// Allow returning to original attributes
			this.storePreviousAttributes();

			// Listen to association events on media
			this.bindAssociations();

			// Handle cancel from modal X or dark area
			this.on("click:cancel", this.onClickCancel);
		},


		/* View Events */

		onShow: function()
		{
			this.onChangeType();

			this.$el.find('input[autofocus]').focus();
		},


		events:
		{
			"click @ui.save":        "onClickSave",
			"click @ui.delete":      "onClickDelete",
			"click @ui.cancel":      "onClickCancel",

			"click @ui.change_icon":  "onClickChangeIcon",
			"click @ui.change_media": "onClickChangeMedia",

			"change input[name='item-type']": "onChangeType"
		},


		/* Crud */

		onClickSave: function()
		{
			var view = this;
			var item = this.model;

			// Save Object
			item.set("name",          view.ui.name.val());
			item.set("description",   view.ui.description.val());
			item.set("url",           view.ui.url.val());
			item.set("weight",        view.ui.weight.val());
			item.set("droppable",     view.ui.droppable.is(":checked") ? "1" : "0");
			item.set("destroyable",   view.ui.destroyable.is(":checked") ? "1" : "0");
			item.set("type",          view.$el.find("input[name=item-type]:checked").val());

			item.set("max_qty_in_inventory", view.ui.max_qty_in_inventory.val());

			item.save({}, {
				create: function() {
					vent.trigger("item:add", item);
					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					view.storePreviousAttributes();

					// FIXME get rid of global update broadcasts for models
					vent.trigger("game_object:update", item);
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

		/* Radio Button field logic */

		onChangeType: function()
		{
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=item-type]:checked");

			this.$el.find("input[name=item-type]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.$el.find('.trigger-tab').hide();

			var display_tab = "." + selected_radio.val() + "-fields";
			$(display_tab).show();

			// Assign value in-case view is re-rendered
			this.model.set("type", selected_radio.val());
		},


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.icon());
			this.stopListening(this.model.media());
		},

		bindAssociations: function() {
			this.listenTo(this.model.icon(),  'change', this.render);
			this.listenTo(this.model.media(), 'change', this.render);
		},


		/* Media Selectors */

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
						vent.trigger("application:popup:show", view, "Edit Item");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Item");
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
				}
			});
		},

		onClickChangeMedia: function() {
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Media */
					var media_chooser = new MediaChooserView({collection: media, selected: view.model.media()});
					vent.trigger("application:popup:show", media_chooser, "Choose Media");

					media_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Item");
					});

					media_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Item");
					});
				}
			});
		},
	}); /* class */
}); /* define */
