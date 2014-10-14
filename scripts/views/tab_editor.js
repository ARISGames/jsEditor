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
], function(_, $, Backbone, Template, MediaCollection, EventsCollection, ItemsCollection, Game, EventPackage, Event, MediaChooserView, EventsEditorView, RequirementsEditorView, RequirementPackage, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, DialogScriptsCollection, WebPagesCollection, TabsCollection, WebHooksCollection, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				icon_thumbnail_url:  this.icon.thumbnail(),

				tab_types: this.tab_types,
				tab_options_visible: _.contains(["DIALOG", "ITEM", "PLAQUE", "WEB_PAGE"], this.model.get("type")),
				tab_content_options: this.tab_content_options(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				}
			};
		},



		ui: {
			"name": "#name",
			"info": "#info",
			"type_select":    "#type",
			"content_select": "#content"
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save":   "onClickSave",
			"click .delete": "onClickDelete",

			"click .change-icon":       "onClickIcon",
			"click .edit-requirements": "onClickRequirements",

			// Field events
			"change @ui.name": "onChangeName",
			"change @ui.info": "onChangeInfo",
			"change @ui.type_select":    "onChangeType",
			"change @ui.content_select": "onChangeContent"
		},

		initialize: function(options) {
			this.icon      = options.icon;
			this.plaques   = options.contents.plaques;
			this.items     = options.contents.items;
			this.web_pages = options.contents.web_pages;
			this.dialogs   = options.contents.dialogs;
		},

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.trigger("tab:add", view.model);
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

		tab_types: {
			'MAP':       'Map',
			'DECODER':   'Decoder',
			'SCANNER':   'Scanner',
			'QUESTS':    'Quests',
			'INVENTORY': 'Inventory',
			'PLAYER':    'Player',
			'NOTEBOOK':  'Notebook',

			'DIALOG':    'Dialog',
			'ITEM':      'Item/Player Attribute',
			'PLAQUE':    'Plaque',
			'WEB_PAGE':  'Web Page'
		},


		tab_content_options: function() {
			// TODO add section headers
			switch(this.model.get("type")) {
				case "DIALOG":
					return this.dialogs.map(function(model) { return {name: model.get("name"), value: model.id} });

				case "ITEM":
					return this.items.map(function(model) { return {name: model.get("name"), value: model.id} });

				case "PLAQUE":
					return this.plaques.map(function(model) { return {name: model.get("name"), value: model.id} });

				case "WEB_PAGE":
					return this.web_pages.map(function(model) { return {name: model.get("name"), value: model.id} });
				default:
					return [];
			}
		},

		/* Field Changes */

		onChangeName: function() { this.model.set("name", this.ui.name.val()); },
		onChangeInfo: function() { this.model.set("info", this.ui.info.val()); },


		onChangeType:   function() {
			var type = this.ui.type_select.val();
			this.model.set("type", type)

			// Change name to avoid confusion.
			this.model.set("name", this.tab_types[type]);

			// Reset Game Object Dropdown.
			this.model.set("content_id", "0");

			this.render();
		},

		onChangeContent:   function() {
			this.model.set("content_id", this.ui.content_select.val())

			// Change name to avoid confusion.
			this.model.set("name", this.ui.content_select.find("option:selected").text());

			this.render();
		},


		/* Media Selection */

		onClickIcon: function() {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Tab Icon");

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
						view.model.set("icon_media_id", media.id);
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
