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
	'collections/game_dialog_scripts',
	'collections/web_pages',
	'collections/quests',
	'collections/web_hooks',
	'models/requirement_package',
	'views/media_chooser',
	'views/requirements',
	'vent'
], function(_, $, Backbone, Template,
	MediaCollection, AndPackagesCollection, AtomsCollection, ItemsCollection, TagsCollection, PlaquesCollection, DialogsCollection, DialogScriptsCollection, WebPagesCollection, QuestsCollection, WebHooksCollection,
	RequirementPackage,
	MediaChooserView, RequirementsEditorView,
	vent) {

	return Backbone.Marionette.CompositeView.extend({

		/* View */

		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				icon_thumbnail_url:  this.model.icon_thumbnail(),

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

				game_object_name: this.model.game_object() ? this.model.game_object().get("name") : ""
			}
		},

		ui: {
			/* Factory */
			"name": "#factory-name",
			"description": "#factory-description",
			"max_production": "#factory-max_production",
			"production_probability": "#factory-production_probability",
			"seconds_per_production": "#factory-seconds_per_production",
			"min_production_distance": "#factory-min_production_distance",
			"max_production_distance": "#factory-max_production_distance",
			"trigger_latitude": "#factory-latitude",
			"trigger_longitude": "#factory-longitude",
			"produce_expiration_time": "#factory-produce_expiration_time",

			"object_id":   "#factory-object_id",
			"object_type": "#factory-object_type",
			"production_bound_type": "#factory-production_bound_type",
			"location_bound_type": "#factory-location_bound_type",

			"produce_expire_on_view": "#factory-produce_expire_on_view",


			/* Trigger */
			"trigger_title": "#factory-trigger-title",
			"trigger_distance": "#factory-trigger-distance",

			"trigger_show_title": "#factory-trigger-show_title",
			"trigger_wiggle": "#factory-trigger-wiggle",
			"trigger_hidden": "#factory-trigger-hidden",
			"trigger_infinite": "#factory-trigger-infinite",
			"title_container": ".title-container",
			"range_container": ".range-container",

			"icon":  ".change-icon img"
		},


		/* Constructor */

		initialize: function(options) {
			this.items     = options.contents.items;
			this.plaques   = options.contents.plaques;
			this.dialogs   = options.contents.dialogs;
			this.web_pages = options.contents.web_pages;

			// Allow returning to original attributes
			this.storePreviousAttributes();

			// Listen to association events on media
			this.bindAssociations();

			// Handle cancel from modal X or dark area
			this.on("popup:hide", this.onClickCancel);
		},


		/* View Events */

		onShow: function() {
			this.onChangeTriggerEnter();
			this.onChangeLocationBoundType();
			this.onChangeTriggerShowTitle();
			this.onChangeTriggerInfinite();

			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save": "onClickSave",
			"click .delete": "onClickDelete",

			"change @ui.name":                    "onChangeName",
			"change @ui.description":             "onChangeDescription",
			"change @ui.max_production":          "onChangeMaxProduction",
			"change @ui.production_probability":  "onChangeProductionProbability",
			"change @ui.seconds_per_production":  "onChangeSecondsPerProduction",
			"change @ui.min_production_distance": "onChangeMinProductionDistance",
			"change @ui.max_production_distance": "onChangeMaxProductionDistance",
			"change @ui.trigger_latitude":        "onChangeTriggerLatitude",
			"change @ui.trigger_longitude":       "onChangeTriggerLongitude",
			"change @ui.produce_expiration_time": "onChangeProduceExpirationTime",

			"change @ui.object_type":             "onChangeObjectType",
			"change @ui.object_id":               "onChangeObject",
			"change @ui.production_bound_type":   "onChangeProductionBoundType",
			"change @ui.location_bound_type":     "onChangeLocationBoundType",

			"change @ui.produce_expire_on_view":  "onChangeProduceExpireOnView",


			/* Trigger section */

			"click .change-icon":            "onClickChangeIcon",
			"click .edit-requirements":      "onClickEditRequirements",

			"change @ui.trigger_title":      "onChangeTriggerTitle",
			"change @ui.trigger_distance":   "onChangeTriggerDistance",

			"change @ui.trigger_show_title": "onChangeTriggerShowTitle",
			"change @ui.trigger_infinite":   "onChangeTriggerInfinite",
			"change @ui.trigger_hidden":     "onChangeTriggerHidden",
			"change @ui.trigger_wiggle":     "onChangeTriggerWiggle",

			"change input[name='factory-trigger_on_enter']": "onChangeTriggerEnter"
		},


		/* Dom manipulation */

		set_icon: function(media) {
			this.ui.icon.attr("src", media.thumbnail_for(this.model));
		},


		/* Crud */

		onClickSave: function() {
			var view    = this;
			var factory = this.model;

			factory.save({}, {
				create: function() {
					storage.add_game_object(factory);

					vent.trigger("application:popup:hide");
				},

				update: function()
				{
					vent.trigger("application:popup:hide");
				}
			});
		},

		onClickDelete: function() {
			var view = this;
			this.model.destroy({
				success: function() {
					vent.trigger("application:popup:hide");
				}
			});
		},


		/* Field changes */

		onChangeName:                  function() { this.model.set("name",                    this.ui.name.val()) },
		onChangeDescription:           function() { this.model.set("description",             this.ui.description.val()) },
		onChangeMaxProduction:         function() { this.model.set("max_production",          this.ui.max_production.val()) },
		onChangeProductionProbability: function() { this.model.set("production_probability",  this.ui.production_probability.val() / 100) },
		onChangeSecondsPerProduction:  function() { this.model.set("seconds_per_production",  this.ui.seconds_per_production.val()) },
		onChangeMinProductionDistance: function() { this.model.set("min_production_distance", this.ui.min_production_distance.val()) },
		onChangeMaxProductionDistance: function() { this.model.set("max_production_distance", this.ui.max_production_distance.val()) },
		onChangeTriggerLatitude:       function() { this.model.set("trigger_latitude",        this.ui.trigger_latitude.val()) },
		onChangeTriggerLongitude:      function() { this.model.set("trigger_longitude",       this.ui.trigger_longitude.val()) },
		onChangeProduceExpirationTime: function() { this.model.set("produce_expiration_time", this.ui.produce_expiration_time.val()) },

		onChangeTriggerTitle:          function() { this.model.set("trigger_title",           this.ui.trigger_title.val()) },
		onChangeTriggerDistance:       function() { this.model.set("trigger_distance",        this.ui.trigger_distance.val()) },


		/* Select Fields */

		onChangeObjectType: function() {
			var value = this.ui.object_type.find("option:selected").val();
			this.model.set("object_type", value);

			// 0 out content ID before re-rendering select
			this.model.set("object_id", "0");
			this.render();
			this.onShow();
		},

		onChangeObject: function() {
			var object_id = this.ui.object_id.find("option:selected").val();

			this.unbindAssociations();
			this.model.set("object_id", object_id);
			this.bindAssociations();

			this.render();
			this.onShow();
		},

		onChangeProductionBoundType: function() {
			var value = this.ui.production_bound_type.find("option:selected").val();
			this.model.set("production_bound_type", value);
		},

		onChangeLocationBoundType: function() {

			var selected_option = this.ui.location_bound_type.find("option:selected");
			this.model.set("location_bound_type", selected_option.val());

			// Hide all and open selected tab
			//
			this.$el.find('.factory-location-bound-tab').hide();

			var display_tab = "#" + selected_option.val() + "-fields";
			$(display_tab).show();
		},


		/* Checkbox Fields */

		onChangeProduceExpireOnView: function() {
			this.model.set("produce_expire_on_view", this.ui.produce_expire_on_view.is(":checked") ? "1" : "0");
		},


		onChangeTriggerShowTitle: function() {
			var value = this.ui.trigger_show_title.is(":checked")
			if(value)
			{
				this.ui.title_container.show()
			}
			else {
				this.ui.title_container.hide()
			}

			this.model.set("trigger_show_title", value ? "1" : "0");
		},

		onChangeTriggerInfinite: function() {
			var value = this.ui.trigger_infinite.is(":checked")
			if(value)
			{
				this.ui.range_container.hide()
			}
			else {
				this.ui.range_container.show()
			}

			this.model.set("trigger_infinite_distance", value ? "1" : "0");
		},


		onChangeTriggerHidden: function() {
			this.model.set("trigger_hidden", this.ui.trigger_hidden.is(":checked") ? "1" : "0");
		},

		onChangeTriggerWiggle: function() {
			this.model.set("trigger_wiggle", this.ui.trigger_wiggle.is(":checked") ? "1" : "0");
		},


		/* Radio Fields */

		onChangeTriggerEnter: function() {
			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=factory-trigger_on_enter]:checked");

			this.model.set("trigger_on_enter", selected_radio.val());

			this.$el.find("input[name=factory-trigger_on_enter]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.$el.find('.enter-factory-trigger-tab').hide();

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


		/* Icon Selection */

		onClickChangeIcon: function() {
			var view = this;

			var media = new MediaCollection([], {parent: this.model.game()});

			media.fetch({
				success: function() {
					/* Add default */
					media.unshift(view.model.default_icon());

					/* Icon */
					var icon_chooser = new MediaChooserView({collection: media, selected: view.model.icon(), context: view.model});

					icon_chooser.on("media:choose", function(media) {
						view.unbindAssociations();
						view.model.set("trigger_icon_media_id", media.id);
						view.bindAssociations();
						vent.trigger("application:popup:show", view, "Edit Factory", true);
					});

					icon_chooser.on("cancel", function() {
						vent.trigger("application:popup:show", view, "Edit Factory", true);
					});

					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");
				}
			});
		},


		/* Requirements Editor */

		onClickEditRequirements: function() {
			var view = this;

			var requirement_package = new RequirementPackage({requirement_root_package_id: view.model.get("trigger_requirement_root_package_id"), game_id: view.model.get("game_id")});

			var game = this.model.game();

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
					vent.trigger("application:popup:show", view, "Edit Factory", true);
				});

				requirements_editor.on("requirement_package:save", function(requirement_package)
				{
					view.model.set("trigger_requirement_root_package_id", requirement_package.id);
					vent.trigger("application:popup:show", view, "Edit Factory", true);
				});

				vent.trigger("application:popup:show", requirements_editor, "Locks Editor");
			});
		}
	});
});
