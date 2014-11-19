define([
	'underscore',
	'jquery',
	'backbone',
	'text!templates/quest_editor.tpl',
	'collections/media',
	'collections/events',
	'collections/items',
	'models/game',
	'models/event_package',
	'models/event',
	'models/quest',
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
	'collections/quests',
	'collections/web_hooks',
	'vent'
], function(_, $, Backbone, Template, MediaCollection, EventsCollection, ItemsCollection, Game, EventPackage, Event, Quest, MediaChooserView, EventsEditorView, RequirementsEditorView, RequirementPackage, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, DialogScriptsCollection, WebPagesCollection, QuestsCollection, WebHooksCollection, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		/* View */

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),

				active_icon_thumbnail_url:    this.model.active_icon_thumbnail(),
				active_media_thumbnail_url:   this.model.active_media_thumbnail(),
				complete_icon_thumbnail_url:  this.model.complete_icon_thumbnail(),
				complete_media_thumbnail_url: this.model.complete_media_thumbnail(),

				option_selected: function(boolean_statement) {
					return boolean_statement ? "selected" : "";
				},

				function_types: Quest.function_types
			};
		},

		ui: {
			"name": "#name",
			"description": "#description",

			"active_description":"#active-description",
			"active_notification_type":"#active-notification-type",
			"active_function":"#active-function",

			"complete_description":"#complete-description",
			"complete_notification_type":"#complete-notification-type",
			"complete_function":"#complete-function",
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
			"click .save": "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel",

			"click .change-active-icon":    "onClickActiveIcon",
			"click .change-active-media":   "onClickActiveMedia",
			"click .change-complete-icon":  "onClickCompleteIcon",
			"click .change-complete-media": "onClickCompleteMedia",

			"click .edit-active-requirements":   "onClickActiveRequirements",
			"click .edit-active-events":         "onClickActiveEvents",
			"click .edit-complete-requirements": "onClickCompleteRequirements",
			"click .edit-complete-events":       "onClickCompleteEvents",

			// Field events
			"change @ui.name":        "onChangeName",
			"change @ui.description": "onChangeDescription",

			"change @ui.active_description":       "onChangeActiveDescription",
			"change @ui.active_notification_type": "onChangeActiveNotificationType",
			"change @ui.active_function":          "onChangeActiveFunction",

			"change @ui.complete_description":       "onChangeCompleteDescription",
			"change @ui.complete_notification_type": "onChangeCompleteNotificationType",
			"change @ui.complete_function":          "onChangeCompleteFunction"
		},


		/* Crud */

		onClickSave: function() {
			var view  = this;

			view.model.save({}, {
				create: function() {
					view.storePreviousAttributes();

					view.trigger("quest:add", view.model);
				},

				success: function() {
					view.storePreviousAttributes();

					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickCancel: function() {
			delete this.previous_attributes.active_requirement_root_package_id;
			delete this.previous_attributes.complete_requirement_root_package_id;
			delete this.previous_attributes.active_event_package_id;
			delete this.previous_attributes.complete_event_package_id;
			this.model.set(this.previous_attributes);
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},


		/* Field Changes */

		onChangeName:        function() { this.model.set("name",        this.ui.name.val()); },
		onChangeDescription: function() { this.model.set("description", this.ui.description.val()); },

		onChangeActiveDescription:   function() { this.model.set("active_description",   this.ui.active_description.val()); },
		onChangeCompleteDescription: function() { this.model.set("complete_description", this.ui.complete_description.val()); },

		onChangeActiveNotificationType:   function() { this.model.set("active_notification_type", this.ui.active_notification_type.find("option:selected").val()) },
		onChangeCompleteNotificationType: function() { this.model.set("complete_notification_type", this.ui.complete_notification_type.find("option:selected").val()) },

		onChangeActiveFunction:   function() { this.model.set("active_function",   this.ui.active_function.find("option:selected").val()) },
		onChangeCompleteFunction: function() { this.model.set("complete_function", this.ui.complete_function.find("option:selected").val()) },


		/* Undo and Association Binding */

		storePreviousAttributes: function() {
			this.previous_attributes = _.clone(this.model.attributes)
		},

		unbindAssociations: function() {
			this.stopListening(this.model.active_icon());
			this.stopListening(this.model.active_media());
			this.stopListening(this.model.complete_icon());
			this.stopListening(this.model.complete_media());
		},

		bindAssociations: function() {
			this.listenTo(this.model.active_icon(),    'change', this.render);
			this.listenTo(this.model.active_media(),   'change', this.render);
			this.listenTo(this.model.complete_icon(),  'change', this.render);
			this.listenTo(this.model.complete_media(), 'change', this.render);
		},


		/* Media Selection */

		onClickActiveIcon: function(event) {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {

					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.active_icon(), context: view.model, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Start Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("active_icon_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Quest");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		onClickActiveMedia: function(event) {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.active_media(), context: view.model, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Start Quest Media");

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("active_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Quest");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},


		onClickCompleteIcon: function(event) {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.complete_icon(), context: view.model, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Complete Quest Icon");

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("complete_icon_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Quest");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		onClickCompleteMedia: function(event) {
			var view = this;
			event.preventDefault();

			var game  = new Game({game_id: this.model.get("game_id")});
			var media = new MediaCollection([], {parent: game});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.complete_media(), context: view.model, back_view: view});
					vent.trigger("application:popup:show", icon_chooser, "Complete Quest Media");

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("complete_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Quest");
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Quest");
					});
				}
			});
		},

		/* Event Editors */

		onClickActiveEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("active_event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("active_event_package_id", event_package.id);

					if(!view.model.isNew() && view.model.hasChanged("active_event_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"active_event_package_id": event_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		},

		onClickCompleteEvents: function() {
			var view = this;

			var event_package = new EventPackage({event_package_id: view.model.get("complete_event_package_id"), game_id: view.model.get("game_id")});
			var events = new EventsCollection([], {parent: event_package});

			var game   = new Game({game_id: view.model.get("game_id")});
			var items  = new ItemsCollection([], {parent: game});

			$.when(items.fetch(), events.fetch()).done(function() {

				// launch editor
				var events_editor = new EventsEditorView({model: event_package, collection: events, items: items});

				events_editor.on("cancel", function()
				{
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				events_editor.on("event_package:save", function(event_package)
				{
					view.model.set("complete_event_package_id", event_package.id);

					if(!view.model.isNew() && view.model.hasChanged("complete_event_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"complete_event_package_id": event_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", events_editor, "Player Modifier");
			});
		},


		/* Requirements Editors */

		onClickActiveRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("active_requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game   = new Game({game_id: view.model.get("game_id")});

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

			// Don't fetch non existent package
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
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("active_requirement_root_package_id", requirement_package.id);

					if(!view.model.isNew() && view.model.hasChanged("active_requirement_root_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"active_requirement_root_package_id": requirement_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		},

		onClickCompleteRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("complete_requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game   = new Game({game_id: view.model.get("game_id")});

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

			// FIXME temporary fix for conditional fetch
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
					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("complete_requirement_root_package_id", requirement_package.id);

					if(!view.model.isNew() && view.model.hasChanged("complete_requirement_root_package_id"))
					{
						// Quicksave if moving from 0 so user has consistent experience
						view.model.save({"complete_requirement_root_package_id": requirement_package.id}, {patch: true});
					}

					vent.trigger("application:popup:show", view, "Edit Quest");
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});
