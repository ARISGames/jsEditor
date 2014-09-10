define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/factory_editor.tpl',
	'collections/media',
	'collections/and_packages',
	'collections/atoms',
	'collections/items',
	'collections/tags',
	'collections/plaques',
	'collections/dialogs',
	'collections/web_pages',
	'collections/quests',
	'collections/web_hooks',
	'models/game',
	'models/requirement_package',
	'views/media_chooser',
	'views/requirements',
	'vent'
], function(_, $, Backbone, Template,
	MediaCollection, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, WebPagesCollection, QuestsCollection, WebHooksCollection,
	Game, RequirementPackage,
	MediaChooserView, RequirementsEditorView,
	vent) {

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

				content_items:     this.isContentItems(),
				content_plaques:   this.isContentPlaques(),
				content_dialogs:   this.isContentDialogs(),
				content_web_pages: this.isContentWebPages(),

				items:     this.items,
				plaques:   this.plaques,
				dialogs:   this.dialogs,
				web_pages: this.web_pages,
			}
		},


		ui: {
			"name": "#factory-name",
			"description": "#factory-description",

			"object_id":   "#factory-object_id",
			"object_type": "#factory-object_type"
		},

		onShow: function() {
			this.onChangeTriggerEnter();

			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
			"click .change-icon": "onClickChangeIcon",
			"click .edit-requirements": "onClickEditRequirements",

			"change @ui.name":        "onChangeName",
			"change @ui.description": "onChangeDescription",
			"change @ui.object_type": "onChangeObjectType",
			"change @ui.object_id":   "onChangeObject",


			"change input[name='factory-trigger_on_enter']": "onChangeTriggerEnter"
		},

		initialize: function(options) {
			this.icon      = options.icon;

			this.items     = options.contents.items;
			this.plaques   = options.contents.plaques;
			this.dialogs   = options.contents.dialogs;
			this.web_pages = options.contents.web_pages;
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

		onChangeObjectType: function() {
			var value = this.ui.object_type.find("option:selected").val();
			this.model.set("object_type", value);

			// 0 out content ID before re-rendering select
			this.model.set("object_id", "0");
			this.render();
		},

		onChangeObject: function() {
			var value = this.ui.object_id.find("option:selected").val();
			this.model.set("object_id", value);
		},

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


		/* Visibility of selections */

		isContentItems: function() {
			return this.model.get("object_type") === "ITEM";
		},

		isContentPlaques: function() {
			return this.model.get("object_type") === "PLAQUE";
		},

		isContentDialogs: function() {
			return this.model.get("object_type") === "DIALOG";
		},

		isContentWebPages: function() {
			return this.model.get("object_type") === "WEB_PAGE";
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
		},


		/* Requirements Editor */

		onClickEditRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("trigger_requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game = new Game({game_id: view.model.get("game_id")});

			var contents = {
				items:      new ItemsCollection    ([], {parent: game}),
				tags:       new TagsCollection     ([], {parent: game}),
				plaques:    new PlaquesCollection  ([], {parent: game}),
				dialogs:    new DialogsCollection  ([], {parent: game}),
				web_pages:  new WebPagesCollection ([], {parent: game}),
				quests:     new QuestsCollection   ([], {parent: game}),
				hooks:      new WebHooksCollection ([], {parent: game})
			};

			if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

			$.when(contents.items.fetch(), contents.tags.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.web_pages.fetch(), contents.quests.fetch(), contents.hooks.fetch(), requirement_package.fetch()).done(function()
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
					vent.trigger("application:popup:show", view, "Edit Factory");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("trigger_requirement_root_package_id", requirement_package.id);
					vent.trigger("application:popup:show", view, "Edit Factory");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});
