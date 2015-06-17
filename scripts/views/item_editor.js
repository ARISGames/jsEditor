define(function(require)
{
	var _                = require('underscore');
	var $                = require('jquery');
	var EditorView       = require('views/editor_base');
	var Template         = require('text!templates/item_editor.tpl');

	var MediaCollection  = require('collections/media');
	var Game             = require('models/game');
	var MediaChooserView = require('views/media_chooser');

	var EventsCollection  = require('collections/item_events');
	var EventInferenceRow = require('views/event_inference_row');

	var vent             = require('vent');
	var storage          = require('storage');


	return EditorView.extend({
		template: _.template(Template),

		itemView: EventInferenceRow,
		itemViewContainer: ".events",

		/* View */

		templateHelpers: function()
		{
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.model.icon_thumbnail(),
				media_thumbnail_url: this.model.media_thumbnail()
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
			"max_qty":     "#item-max_qty_in_inventory",
			"item_types":  ".item-type",
			"type_tabs":   ".type-tab"
		},


		/* Constructor */

		initialize: function() {
			// Allow returning to original attributes
			this.storePreviousAttributes();

			// Listen to association events on media
			this.bindAssociations();

			// Handle cancel from modal X or dark area
			this.on("popup:hide", this.onClickCancel);

			this.collection = new EventsCollection;
			// Load inferences
			this.loadInferences();
		},


		/* View Events */

		onShow: function()
		{
			this.$el.find('input[autofocus]').focus();
		},


		events:
		{
			"click @ui.save":   "onClickSave",
			"click @ui.delete": "onClickDelete",
			"click @ui.cancel": "onClickCancel",

			"click @ui.change_icon":  "onClickChangeIcon",
			"click @ui.change_media": "onClickChangeMedia",


			// Field events
			"change @ui.name":        "onChangeName",
			"change @ui.description": "onChangeDescription",
			"change @ui.url":         "onChangeUrl",
			"change @ui.weight":      "onChangeWeight",
			"change @ui.droppable":   "onChangeDroppable",
			"change @ui.destroyable": "onChangeDestroyable",
			"change @ui.max_qty":     "onChangeMaxQuantity",

			"change @ui.item_types":   "onChangeType"
		},


		/* Crud */

		onClickSave: function()
		{
			var view = this;
			var item = this.model;

			// Save Object

			item.save({}, {
				create: function() {
					view.storePreviousAttributes();

					storage.add_game_object(item);

					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					view.storePreviousAttributes();

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
					vent.trigger("application:popup:hide");
				}
			});
		},


		/* Field Changes */

		onChangeName:        function() { this.model.set("name",        this.ui.name.val()); },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()); },
		onChangeUrl:         function() { this.model.set("url",         this.ui.url.val()); },
		onChangeWeight:      function() { this.model.set("weight",      this.ui.weight.val()); },

		onChangeDroppable:   function() { this.model.set("droppable",   this.ui.droppable.is(":checked") ? "1" : "0");   },
		onChangeDestroyable: function() { this.model.set("destroyable", this.ui.destroyable.is(":checked") ? "1" : "0"); },

		onChangeMaxQuantity: function() { this.model.set("max_qty_in_inventory", this.ui.max_qty.val()); },


		/* Radio Button field logic */

		onChangeType: function()
		{
			var selected_radio = this.$el.find(".item-type:checked");

			this.model.set("type", selected_radio.val());

			// Hide radio buttons and add bootstrap classes
			//
			this.ui.item_types.parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.ui.type_tabs.hide();

			var display_tab = "." + selected_radio.val() + "-fields";
			$(display_tab).show();
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

		loadInferences: function()
		{
			var item = this.model;
			var view = this;

			var game   = new Game({game_id: this.model.get("game_id")});
			var events = new EventsCollection([], {parent: game});

			// FIXME Add easier event binding to new/missing models so no local prefetch is needed (or is done outside this)
			// Right now: Fetch these locally just so the association on event will work without re-rendering.
			var contents = {
				quests:    storage.quests,
				plaques:   storage.plaques,
				dialogs:   storage.dialogs,
				dialog_scripts: storage.dialog_scripts
			};

			$.when(contents.plaques.fetch(), contents.dialogs.fetch(), contents.dialog_scripts.fetch(), contents.quests.fetch()).done(function()
			{
				events.fetch({
					success: function()
					{
						var item_events = events.where({content_id: item.id});
						view.collection.reset(item_events);
						if(item_events.length > 0)
						{
							view.$el.find('.inference_label').removeClass('hidden');
						}
					}
				});
			});
		}
	}); /* class */
}); /* define */
