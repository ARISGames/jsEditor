define(function(require)
{
	var _        = require('underscore');
	var $        = require('jquery');
	var Backbone = require('backbone');
	var Template = require('text!templates/trigger_location_editor.tpl');
	var vent     = require('vent');

	var RequirementsEditorView  = require('views/requirements');
	var MediaChooserView        = require('views/media_chooser');

	var MediaCollection         = require('collections/media');
	var AndPackagesCollection   = require('collections/and_packages');
	var AtomsCollection         = require('collections/atoms');
	var ItemsCollection         = require('collections/items');
	var TagsCollection          = require('collections/tags');
	var PlaquesCollection       = require('collections/plaques');
	var DialogsCollection       = require('collections/dialogs');
	var DialogScriptsCollection = require('collections/game_dialog_scripts');
	var WebPagesCollection      = require('collections/web_pages');
	var QuestsCollection        = require('collections/quests');
	var WebHooksCollection      = require('collections/web_hooks');

	var RequirementPackage      = require('models/requirement_package');


	return Backbone.Marionette.CompositeView.extend({

		/* View */

		template: _.template(Template),

		templateHelpers: function() {
			return {
				// Using views icon since we are not directly changing the model until save.
				icon_thumbnail_url: this.icon.thumbnail_for(this.model),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},


				// Game Object Attributes
				game_object_id: this.game_object.id,
				name: this.game_object.get('name')
			};
		},

		ui: {
			"title":      "#trigger-title",
			"latitude":   "#trigger-latitude",
			"longitude":  "#trigger-longitude",
			"distance":   "#trigger-distance",
			"infinite":   "#trigger-infinite",
			"wiggle":     "#trigger-wiggle",
			"show_title": "#trigger-show_title",
			"hidden":     "#trigger-hidden",
			"range_container":".range-container",

			"icon":       ".change-icon img"
		},


		/* Dom manipulation */

		set_icon: function(media) {
			this.ui.icon.attr("src", media.thumbnail_for(this.model));
		},

		syncLatitude: function(model, value) {
			this.ui.latitude.val(value);
		},

		syncLongitude: function(model, value) {
			this.ui.longitude.val(value);
		},

		syncDistance: function(model, value) {
			this.ui.distance.val(value);
		},


		/* Initialization and Rendering */

		initialize: function(options) {
			this.game_object = this.model.game_object();
			this.icon        = this.model.icon();

			/* Game object and Icon media change events */

			this.bindIconAssociation();
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();

			this.renderTriggerRadio();
			this.onChangeInfinity();
			this.onChangeShowTitle();
		},

		onClose: function()
		{
			this.model.trigger("update_map");
		},


		/* View/Model Events */

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel",

			"change @ui.infinite": "onChangeInfinity",
			"change @ui.show_title": "onChangeShowTitle",

			"click .change-icon":  "onClickChangeIcon",
			"click .edit-requirements": "onClickEditRequirements",

			"change input[name='trigger-trigger_on_enter']": "onChangeTriggerEnter"
		},

		// Update the view from the map marker while allowing 'cancel' to undo all other attributes.
		modelEvents: {
			"change:latitude":  "syncLatitude",
			"change:longitude": "syncLongitude",
			"change:distance":  "syncDistance",
		},


		/* Crud */

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					view.model.trigger("remove_marker");
					view.close();
				}
			});
		},

		onClickCancel: function() {
			// FIXME undo all model attributes since view (minus lat/long).
			// currently avoiding setting attributes on model until save.
			// See dialog option editor for example of 'undo' with cleaner rendering.
			this.close();
		},

		onClickSave: function() {
			var view    = this;
			var trigger = this.model;

			// FIXME all change events.
			trigger.set("title",     view.ui.title.val());
			trigger.set("latitude",  view.ui.latitude.val());
			trigger.set("longitude", view.ui.longitude.val());
			trigger.set("distance",  String(view.ui.distance.val()));

			trigger.set("infinite_distance", view.ui.infinite.is  (":checked") ? "1" : "0");
			trigger.set("wiggle",            view.ui.wiggle.is    (":checked") ? "1" : "0");
			trigger.set("show_title",        view.ui.show_title.is(":checked") ? "1" : "0");
			trigger.set("hidden",            view.ui.hidden.is    (":checked") ? "1" : "0");

			trigger.set("icon_media_id", view.icon.get("media_id"));

			trigger.trigger("update_map");
			trigger.save();
		},


		/* Association Binding */

		unbindIconAssociation: function() {
			this.stopListening(this.icon);
			this.stopListening(this.game_object.icon());
		},

		bindIconAssociation: function() {
			this.listenTo(this.icon,               'change', this.set_icon);
			this.listenTo(this.game_object.icon(), 'change', this.set_icon);
		},


		/* Radio Logic */

		onChangeInfinity: function() {
			if(this.ui.infinite.is(":checked"))
			{

				this.model.trigger("hide_range");
				this.ui.range_container.hide();
			}
			else
			{
				this.model.trigger("show_range");
				this.ui.range_container.show();
			}
		},

		onChangeShowTitle: function() {
			if(this.ui.show_title.is(":checked"))
			{
				this.ui.title.show();
			}
			else
			{
				this.ui.title.hide();
			}
		},

		renderTriggerRadio: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=trigger-trigger_on_enter]:checked");

			this.$el.find("input[name=trigger-trigger_on_enter]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.$el.find('.enter-trigger-tab').hide();

			var display_tab = "#trigger-" + selected_radio.val() + "-fields";
			$(display_tab).show();
		},

		onChangeTriggerEnter: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=trigger-trigger_on_enter]:checked");

			view.model.set("trigger_on_enter", selected_radio.val());

			this.renderTriggerRadio();
		},


		/* Icon selector */

		onClickChangeIcon: function()
		{
			var view = this;

			var game  = this.model.game();
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function()
				{
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.icon, context: view.model});
					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");

					icon_chooser.on("media:choose", function(media) {
						view.unbindIconAssociation();
						view.icon = media;
						view.bindIconAssociation();
						view.set_icon(media);
						vent.trigger("application:popup:hide");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:hide");
					});
				}
			});
		},


		/* Requirements Editor */

		onClickEditRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game = view.model.game();

			var contents = {
				items:          new ItemsCollection         ([], {parent: game}),
				tags:           new TagsCollection          ([], {parent: game}),
				plaques:        new PlaquesCollection       ([], {parent: game}),
				dialogs:        new DialogsCollection       ([], {parent: game}),
				dialog_scripts: new DialogScriptsCollection ([], {parent: game}),
				web_pages:      new WebPagesCollection      ([], {parent: game}),
				quests:         new QuestsCollection        ([], {parent: game}),
				hooks:          new WebHooksCollection      ([], {parent: game})
			};

			if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

			$.when(contents.items.fetch(), contents.tags.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.dialog_scripts.fetch(), contents.web_pages.fetch(), contents.quests.fetch(), contents.hooks.fetch(), requirement_package.fetch()).done(function()
			{
				// Load associations into collections
				var and_packages = new AndPackagesCollection(requirement_package.get("and_packages"));
				requirement_package.set("and_packages", and_packages);

				and_packages.each(function(and_package) {
					var atoms = new AtomsCollection(and_package.get("atoms"));
					and_package.set("atoms", atoms);
				});

				// launch editor
				var requirements_editor = new RequirementsEditorView({model: requirement_package, collection: and_packages, contents: contents});

				requirements_editor.on("cancel", function()
				{
					vent.trigger("application:popup:hide");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("requirement_root_package_id", requirement_package.id);

					if(view.model.hasChanged("requirement_root_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"requirement_root_package_id": requirement_package.id}, {patch: true});
					}

					vent.trigger("application:popup:hide");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});
