define(function(require)
{
	var _        = require('underscore');
	var $        = require('jquery');
	var Backbone = require('backbone');
	var vent     = require('vent');
	var Template = require('text!templates/trigger_editor_base.tpl');

	var QRCode   = require('qrcode');

	/* Media Editor */
	var MediaChooserView        = require('views/media_chooser');
	var MediaCollection         = require('collections/media');

	/* Requirements Editor */
	var RequirementsEditorView  = require('views/requirements');
	var RequirementPackage      = require('models/requirement_package');
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

	return Backbone.Marionette.CompositeView.extend({

		/* View */

		template: _.template(Template),

		ui: {
			"save":   ".save",
			"delete": ".delete",
			"cancel": ".cancel",

			"change_icon":       ".change-icon",
			"edit_game_object":  ".edit-game_object",
			"edit_requirements": ".edit-requirements",

			"name":        "#object-name",

			"title":       "#trigger-title",
			"latitude":    "#trigger-latitude",
			"longitude":   "#trigger-longitude",
			"distance":    "#trigger-distance",
			"infinite":    "#trigger-infinite",
			"wiggle":      "#trigger-wiggle",
			"show_title":  "#trigger-show_title",
			"hidden":      "#trigger-hidden",
			"code":        "#trigger-code",

			"trigger_types": ".trigger-type",
			"trigger_enter": ".trigger-enter",

			"trigger_type_tabs":  ".type-trigger-tab",
			"trigger_enter_tabs": ".enter-trigger-tab",

			"title_container": ".title-container",

			"object_name": ".game_object-name",

			"qr_image":   ".qr_image",
			"map_canvas": ".map-canvas",
			"icon":       ".change-icon img",

			"autofocus":  "input[autofocus]"
		},

		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				in_modal: this.options.in_modal,
				visible_fields: this.visible_fields,

				// Using views icon since we are not directly changing the model until save.
				icon_thumbnail_url: this.icon.thumbnail_for(this.model),

				// Field logic
				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},

				tab_selected: function(boolean_statement) {
					return boolean_statement ? "active" : "";
				},

				tab_visible: function(boolean_statement) {
					return boolean_statement ? "" : "style='display: none;'";
				},

				// Game Object Attributes
				game_object_id: this.game_object.id,
				name: this.game_object.get('name'),

				// Virtual, defined in sub classes
				parent_label: this.parent_label,
				parent_icon:  this.parent_icon
			}
		},


		/* Dom manipulation */

		set_icon: function(media) {
			this.ui.icon.attr("src", media.thumbnail_for(this.model));
		},

		set_name: function(game_object) {
			var name = game_object.get("name");
			this.ui.object_name.text(name);
			this.ui.title.attr('placeholder', name);
		},


		/* Initialization and Rendering */

		initialize: function(options) {
			this.icon        = this.model.icon();

			this.scene       = options.scene;
			this.game_object = options.game_object;
			this.instance    = options.instance;

			// FIXME trying to avoid circular bug with storage
			this.model.game_object(this.game_object);

			// TODO refactor visible fields into separate view for 'quick create'
			this.visible_fields = options.visible_fields;

			/* Game object and Icon media change events */

			this.bindIconAssociation();
			this.bindGameObjectAssociation();
		},

		onShow: function() {
			this.ui.autofocus.focus();
		},

		onRender: function() {
			var view = this;

			if(this.options.visible_fields === "trigger") {
				setTimeout(function() {view.renderMap()}, 300);
				this.initializeQR();
			}
		},


		/* View Events */

		events: {
			"click @ui.save":   "onClickSave",
			"click @ui.delete": "onClickDelete",
			"click @ui.cancel": "onClickCancel",

			"click @ui.change_icon":       "onClickChangeIcon",
			"click @ui.edit_game_object":  "onClickEditGameObject",
			"click @ui.edit_requirements": "onClickEditRequirements",

			"change @ui.infinite":      "onChangeInfinity",
			"change @ui.show_title":    "onChangeShowTitle",
			"change @ui.trigger_types": "onChangeType",
			"change @ui.trigger_enter": "onChangeTriggerEnter",

			"change @ui.code": "onChangeCode",
			"keyup  @ui.code": "onChangeCode"
		},


		/* Crud */

		onClickSave: function() {
			var view = this;
			var instance    = this.instance;
			var game_object = this.game_object;
			var trigger     = this.model;

			// FIXME temporary fix to grab fields only when visible
			if(view.options.visible_fields === "create_game_object_with_trigger" ) {
				game_object.set("name", view.ui.name.val());
			}

			// TODO unwravel unto promises with fail delete (or a single api call that has a transaction)
			game_object.save({}, {
				create: function() {
					vent.trigger("game_object:add", game_object);
				},
				success: function() {
					// Save Instance

					instance.set("object_id",   game_object.id);
					instance.set("object_type", instance.type_for(game_object));

					instance.save({}, {
						success: function() {
							// Save Trigger
							trigger.set("instance_id", instance.id);

							// FIXME temporary fix to grab fields only when visible
							if(view.options.visible_fields === "trigger") {
								trigger.set("title",             view.ui.title.val());
								trigger.set("qr_code",           view.ui.code.val());

								trigger.set("wiggle",            view.ui.wiggle.is    (":checked") ? "1" : "0");
								trigger.set("show_title",        view.ui.show_title.is(":checked") ? "1" : "0");
								trigger.set("hidden",            view.ui.hidden.is    (":checked") ? "1" : "0");
								trigger.set("infinite_distance", view.ui.infinite.is  (":checked") ? "1" : "0");

								trigger.set("type",              view.$el.find(".trigger-type:checked").val());
								trigger.set("trigger_on_enter",  view.$el.find(".trigger-enter:checked").val());

								trigger.set("icon_media_id", view.icon.get("media_id"));
							}

							// Otherwise Initial Fields are all default.

							trigger.save({},
							{
								create: function()
								{
									// FIXME better way to handle this?
									vent.trigger("scene:add_trigger", trigger);
									vent.trigger("application:popup:hide");
								},
								success: function()
								{
									vent.trigger("trigger:update", trigger);
								}

							}); /* Trigger save */
						}
					}); /* Instance save */
				}
			}); /* Game Object save */
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					view.close();
				}
			});
		},

		onClickCancel: function() {
			this.close();
			vent.trigger("application:popup:hide");
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

		bindGameObjectAssociation: function() {
			var view = this;
			this.listenTo(vent, "game_object:update", function(game_object)
			{
				if(game_object.is(view.game_object))
				{
					view.game_object = game_object;
					view.set_name(view.game_object);
					view.set_icon(view.icon);
				}
			});

			this.listenTo(vent, "game_object:delete", function(game_object)
			{
				if(game_object.is(view.game_object))
				{
					view.close();
				}
			});
		},


		/* Radio Logic */

		onChangeType: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find(".trigger-type:checked");

			this.ui.trigger_types.parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.ui.trigger_type_tabs.hide();

			var display_tab = "#" + selected_radio.val() + "-fields";
			this.$el.find(display_tab).show();

			// Hidden maps have rendering issues.
			setTimeout(function() {view.renderMap()}, 300);
		},

		onChangeTriggerEnter: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find(".trigger-enter:checked");

			this.ui.trigger_enter.parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.ui.trigger_enter_tabs.hide();

			var display_tab = "#" + selected_radio.val() + "-fields";
			this.$el.find(display_tab).show();
		},


		/* Checkbox Logic */

		onChangeInfinity: function() {
			if(this.ui.infinite.is(":checked"))
			{
				this.drag_marker.setIcon("images/marker-green.png");
				this.range_marker.setVisible(false);
			}
			else
			{
				this.drag_marker.setIcon();
				this.range_marker.setVisible(true);
			}
		},

		onChangeShowTitle: function() {
			if(this.ui.show_title.is(":checked"))
			{
				this.ui.title_container.show();
			}
			else
			{
				this.ui.title_container.hide();
			}
		},


		/* Media Selector */

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
		},


		/* QR */
		initializeQR: function() {
			this.qr_code = new QRCode(this.ui.qr_image.get(0), this.model.get("qr_code"));
		},

		onChangeCode: function() {
			this.qr_code.makeCode(this.ui.code.val());
		},

		/* Map */

		renderMap: function() {
			var view = this;

			// Render Map
			var element = this.ui.map_canvas.get(0);

			var default_location = new google.maps.LatLng(43.073, -89.4012);
			var map_options = {
				zoom: 8,
				center: default_location,
				scrollwheel: false
			};
			var map = new google.maps.Map(element, map_options);
			var boundary = new google.maps.LatLngBounds();

			boundary.extend(default_location);

			// Add Trigger Location to map
			var location_position = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"));


			var circle_marker = new google.maps.Circle({
				center: location_position,
				draggable: true,
				editable: true,
				radius: parseFloat(this.model.get("distance")),
				suppressUndo: true,
				map: map,
				fillColor: '#428bca',
				strokeColor: '#428bca'
			});

			var drag_marker = new google.maps.Marker({
				position: location_position,
				title: this.model.get("title"),
				map: map,
				draggable: true
			});


			this.range_marker = circle_marker;
			this.drag_marker  = drag_marker;

			if(this.ui.infinite.is(":checked"))
			{
				drag_marker.setIcon("images/marker-green.png");
				circle_marker.setVisible(false);
			}

			circle_marker.bindTo('center', drag_marker, 'position');


			var center_on = function(circle) {
				// Add circle radius to map boundary
				boundary = circle.getBounds();

				// Fit map to all locations
				map.setCenter(boundary.getCenter());
				map.fitBounds(boundary);
			}

			// Initial view
			center_on(circle_marker);

			// Track drag and resize
			google.maps.event.addListener(circle_marker, 'radius_changed', function(event) {
				view.model.set("distance", circle_marker.getRadius());

				center_on(circle_marker);
			});

			google.maps.event.addListener(circle_marker, 'dragend', function(event) {
				var center = circle_marker.getCenter();

				view.model.set("latitude",  center.lat());
				view.model.set("longitude", center.lng());

				center_on(circle_marker);
			});

			google.maps.event.addListener(drag_marker, 'dragend', function(event) {
				var center = circle_marker.getCenter();

				view.model.set("latitude",  center.lat());
				view.model.set("longitude", center.lng());

				center_on(circle_marker);
			});

		}

	});

});
