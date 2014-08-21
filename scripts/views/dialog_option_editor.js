define([
	'underscore',
	'backbone',
	'text!templates/dialog_option_editor.tpl',
	'views/requirements',
	'models/requirement_package',
	'models/game',
	'collections/and_packages',
	'collections/atoms',
	'collections/items',
	'collections/tags',
	'collections/plaques',
	'collections/dialogs',
	'collections/web_pages',
	'collections/quests',
	'collections/web_hooks',
	'vent'
], function(_, Backbone, Template,
	RequirementsEditorView,
	RequirementPackage,
	Game,
	AndPackagesCollection,
	AtomsCollection,
	ItemsCollection,
	TagsCollection,
	PlaquesCollection,
	DialogsCollection,
	WebPagesCollection,
	QuestsCollection,
	WebHooksCollection,
	vent) {
	return Backbone.Marionette.ItemView.extend({

		template: _.template(Template),


		initialize: function(options) {
			this.scripts = options.scripts;

			this.plaques   = options.contents.plaques;
			this.items     = options.contents.items;
			this.web_pages = options.contents.web_pages;
			this.dialogs   = options.contents.dialogs;
			this.tabs      = options.contents.tabs;

			this.previous_attributes = _.clone(this.model.attributes)
		},


		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},
				link_types: this.link_types,

				scripts: this.scripts,

				// game objects for option menu
				plaques:   this.plaques,
				items:     this.items,
				web_pages: this.web_pages,
				dialogs:   this.dialogs,
				tabs:      this.tabs,

				link_options_visible: this.model.get("link_type") !== "EXIT",

				link_scripts:   this.model.get("link_type") === "DIALOG_SCRIPT",
				link_plaques:   this.model.get("link_type") === "EXIT_TO_PLAQUE",
				link_items:     this.model.get("link_type") === "EXIT_TO_ITEM",
				link_web_pages: this.model.get("link_type") === "EXIT_WEB_PAGE",
				link_dialogs:   this.model.get("link_type") === "EXIT_DIALOG",
				link_tabs:      this.model.get("link_type") === "EXIT_TAB"
			}
		},

		ui: {
			link_type: ".link-type",
			link_id:   ".link-id",
			prompt:    ".prompt"
		},

		events: {
			"change @ui.link_type": "onChangeLinkType",
			"change @ui.link_id":   "onChangeLinkId",
			"change @ui.prompt":    "onChangePrompt",
			"click .save":          "onClickSave",
			"click .cancel":        "onClickCancel",
			"click .edit-requirements": "onClickEditRequirements",
		},

		link_types: {
			'DIALOG_SCRIPT':    "Say Line",
			'EXIT':             "End Conversation",
			'EXIT_TO_PLAQUE':   "Exit to Plaque",
			'EXIT_TO_ITEM':     "Exit to Item",
			'EXIT_TO_WEB_PAGE': "Exit to Web Page",
			'EXIT_TO_DIALOG':   "Exit to Conversation",
			'EXIT_TO_TAB':      "Exit to Tab"
		},


		onChangeLinkType: function() {
			var value = this.ui.link_type.find("option:selected").val();
			this.model.set("link_type", value);

			// 0 out link ID before re-rendering sub select
			this.model.set("link_id", "0");
			this.render();
		},

		onChangeLinkId: function() {
			var value = this.ui.link_id.find("option:selected").val();
			this.model.set("link_id", value);
		},

		onChangePrompt: function() {
			this.model.set("prompt", this.ui.prompt.val());
		},


		onClickSave: function() {
			this.model.save({}, {
				success: function() {
					vent.trigger("conversation:update");
					vent.trigger("application:info:hide");
				}
			});
		},

		onClickCancel: function() {
			this.model.set(this.previous_attributes);
			vent.trigger("application:info:hide");
		},

		onClickEditRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("requirement_root_package_id"), game_id: view.model.get("game_id")});

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
					vent.trigger("application:popup:hide");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("requirement_root_package_id", requirement_package.id);
					vent.trigger("application:popup:hide");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});
