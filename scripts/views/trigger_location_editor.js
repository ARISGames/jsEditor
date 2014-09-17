define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/trigger_location_editor.tpl',
	'views/requirements',
	'views/media_chooser',
	'collections/media',
	'collections/and_packages',
	'collections/atoms',
	'collections/items',
	'collections/tags',
	'collections/plaques',
	'collections/dialogs',
	'collections/game_dialog_scripts',
	'collections/web_pages',
	'collections/quests',
	'collections/web_hooks',
	'models/game',
	'models/requirement_package',
	'vent'
], function(_, $, Backbone, Template,
	RequirementsEditorView, MediaChooserView,
	MediaCollection, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, DialogScriptsCollection, WebPagesCollection, QuestsCollection, WebHooksCollection,
	Game, RequirementPackage,
	vent) {

	// FIXME this view can be simplified with a library that either does model binding every field, OR only re-drawing elements of changed fields
	// else it just ends up overwriting text areas when you draw the map

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				icon_thumbnail_url:  this.icon.thumbnail(),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				}
			};
		},

		initialize: function(options) {
			this.icon     = options.icon;
		},

		ui: {
			"title":      "#trigger-title",
			"latitude":   "#trigger-latitude",
			"longitude":  "#trigger-longitude",
			"distance":   "#trigger-distance",
			"wiggle":     "#trigger-wiggle",
			"show_title": "#trigger-show_title",
			"hidden": "#trigger-hidden"
		},

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel",

			"click .change-icon":  "onClickChangeIcon",
			"click .edit-requirements": "onClickEditRequirements",

			"change input[name='trigger-trigger_on_enter']": "onChangeTriggerEnter"
		},

		modelEvents: {
			// NOTE this is on set not save.
			"change": "modelChanged"
		},

		modelChanged: function() {
			this.render();
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		onRender: function() {
			this.renderTriggerRadio();
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					// FIXME hack events
					view.model.trigger("delete_map");
					view.close();
				}
			});
		},

		onClickCancel: function() {
			// FIXME undo all model attributes since view (minute lat/long)
			this.close();
		},

		onClickSave: function() {
			var view = this;
			var trigger  = this.model;

			// FIXME all change events.
			trigger.set("title",      view.ui.title.val());
			trigger.set("latitude",   view.ui.latitude.val());
			trigger.set("longitude",  view.ui.longitude.val());
			trigger.set("distance",   view.ui.distance.val());
			trigger.set("wiggle",     view.ui.wiggle.is(":checked") ? "1" : "0");
			trigger.set("show_title", view.ui.show_title.is(":checked") ? "1" : "0");
			trigger.set("hidden",     view.ui.hidden.is    (":checked") ? "1" : "0");

			trigger.trigger("update_map");
			trigger.save();
		},


		/* Trigger Radio Button */

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

			var display_tab = "#" + selected_radio.val() + "-fields";
			$(display_tab).show();
		},

		onChangeTriggerEnter: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=trigger-trigger_on_enter]:checked");

			view.model.set("trigger_on_enter", selected_radio.val());
		},


		/* Icon selector */

		onClickChangeIcon: function()
		{
			var view = this;

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function()
				{
					var icon_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("icon_media_id", view.icon.get("media_id"));
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

			var game = new Game({game_id: view.model.get("game_id")});

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
		},

	});
});
