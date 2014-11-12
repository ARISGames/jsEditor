define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/tab_editor.tpl',
	'collections/media',
	'collections/events',
	'collections/items',
	'models/game',
	'models/event_package',
	'models/event',
	'models/tab',
	'views/media_chooser',
	'views/events',
	'views/requirements',
	'models/requirement_package',
	'collections/and_packages',
	'collections/atoms',
	'collections/items',
	'collections/tags',
	'collections/plaques',
	'collections/dialogs',
	'collections/game_dialog_scripts',
	'collections/web_pages',
	'collections/tabs',
	'collections/web_hooks',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, EventsCollection, ItemsCollection, Game, EventPackage, Event, Tab, MediaChooserView, EventsEditorView, RequirementsEditorView, RequirementPackage, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, DialogScriptsCollection, WebPagesCollection, TabsCollection, WebHooksCollection, vent) {

	return Backbone.Marionette.CompositeView.extend({

		/* View */

		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				icon_thumbnail_url:  this.model.icon_thumbnail(),

				parent_name: this.parent_name(),

				tab_types: this.tab_types,
				tab_options_visible: _.contains(["DIALOG", "ITEM", "PLAQUE", "WEB_PAGE"], this.model.get("type")),
				tab_content_options: this.tab_content_options(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				}
			};
		},


		ui: {
			"save":   ".save",
			"delete": ".delete",
			"cancel": ".cancel",

			"change_icon":       ".change-icon",
			"edit_requirements": ".edit-requirements",

			"name": "#name",
			"info": "#info",
			"type_select":    "#type",
			"content_select": "#content",

			"icon":  ".change-icon img"
		},


		/* Constructor */

		initialize: function(options) {
			// Dropdown lists FIXME replace with storage.
			this.plaques   = options.contents.plaques;
			this.items     = options.contents.items;
			this.web_pages = options.contents.web_pages;
			this.dialogs   = options.contents.dialogs;

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
			"click @ui.cancel": "onClickSave",
			"click @ui.delete": "onClickDelete",

			"click @ui.change_icon":       "onClickIcon",
			"click @ui.edit_requirements": "onClickRequirements",

			// Field events
			"change @ui.name": "onChangeName",
			"change @ui.info": "onChangeInfo",
			"change @ui.type_select":    "onChangeType",
			"change @ui.content_select": "onChangeContent"
		},


		/* Dom manipulation */

		set_icon: function(media) {
			this.ui.icon.attr("src", media.thumbnail_for(this.model));
		},


		/* Crud */

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.storePreviousAttributes();

					view.trigger("tab:add", view.model);
				},

				success: function() {
					view.storePreviousAttributes();

					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickCancel: function() {
			delete this.previous_attributes.requirement_root_package_id;
			this.model.set(this.previous_attributes);
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},


		/* Tab name logic */

		tab_types: Tab.tab_types,

		tab_content_options: function() {
			// TODO add section headers
			switch(this.model.get("type")) {
				case "DIALOG":
					return this.dialogs.map(function(model)   { return {name: model.get("name"), value: model.id} });

				case "ITEM":
					return this.items.map(function(model)     { return {name: model.get("name"), value: model.id} });

				case "PLAQUE":
					return this.plaques.map(function(model)   { return {name: model.get("name"), value: model.id} });

				case "WEB_PAGE":
					return this.web_pages.map(function(model) { return {name: model.get("name"), value: model.id} });
				default:
					return [];
			}
		},

		parent_name: function() {

			if(this.model.get("content_id") === "0")
			{
				return this.model.tab_type_name();
			}
			else
			{
				return this.model.game_object().get("name");
			}
		},

		/* Field Changes */

		onChangeName: function() { this.model.set("name", this.ui.name.val()); },
		onChangeInfo: function() { this.model.set("info", this.ui.info.val()); },


		onChangeType:   function() {
			var type = this.ui.type_select.val();
			this.model.set("type", type)

			// Reset Game Object Dropdown.
			this.model.set("content_id", "0");

			this.render();
		},

		onChangeContent:   function() {
			this.model.set("content_id", this.ui.content_select.val())

			var content_collections = {
				"DIALOG":   this.dialogs,
				"ITEM":     this.items,
				"PLAQUE":   this.plaques,
				"WEB_PAGE": this.web_pages
			}

			// FIXME replace with set game_object_id and storage.
			var collection = content_collections[this.model.get("type")];
			var game_object = collection.get(this.model.get("content_id"));

			this.unbindAssociations();
			this.model.game_object(game_object);
			this.bindAssociations();

			this.render();
		},


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.icon());

			if(this.model.game_object())
			{
				this.stopListening(this.model.game_object().icon());
			}
		},

		bindAssociations: function() {
			this.listenTo(this.model.icon(), 'change', this.set_icon);

			if(this.model.game_object())
			{
				this.listenTo(this.model.game_object().icon(), 'change', this.set_icon);
			}
		},


		/* Media Selection */

		onClickIcon: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.icon(), context: view.model, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Tab Icon");

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("icon_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Tab");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Tab");
					});
				}
			});
		},


		/* Requirements Editors */

		onClickRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game   = new Game({game_id: view.model.get("game_id")});

			var contents = {
				items:          new ItemsCollection         ([], {parent: game}),
				tags:           new TagsCollection          ([], {parent: game}),
				plaques:        new PlaquesCollection       ([], {parent: game}),
				dialogs:        new DialogsCollection       ([], {parent: game}),
				dialog_scripts: new DialogScriptsCollection ([], {parent: game}),
				web_pages:      new WebPagesCollection      ([], {parent: game}),
				tabs:           new TabsCollection          ([], {parent: game}),
				hooks:          new WebHooksCollection      ([], {parent: game})
			};

			// Don't fetch non existent package
			if(requirement_package.id === "0") { requirement_package.fetch = function() {}; }

			$.when(contents.items.fetch(), contents.tags.fetch(), contents.plaques.fetch(), contents.dialogs.fetch(), contents.dialog_scripts.fetch(), contents.web_pages.fetch(), contents.tabs.fetch(), contents.hooks.fetch(), requirement_package.fetch()).done(function()
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
					vent.trigger("application:popup:show", view, "Edit Tab");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("requirement_root_package_id", requirement_package.id);

					if(!view.model.isNew() && view.model.hasChanged("requirement_root_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"requirement_root_package_id": requirement_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Tab");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});