define(function(require)
{
	var _        = require('underscore');
	var $        = require('jquery');
	var Backbone = require('backbone');
	var vent     = require('vent');

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

		ui: {
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

			"title_container": ".title-container"
		},


		/* Dom manipulation */

		set_icon: function(media) {
			this.$el.find(".change-icon img").attr("src", media.thumbnail());
		},

		set_name: function(game_object) {
			this.$el.find('.name-container').html(game_object.get('name'));
		},


		/* Initialization and Rendering */

		onShow: function() {
			this.setVisibleFields();

			this.$el.find('input[autofocus]').focus();
		},

		setVisibleFields: function() {
			this.onChangeType();
			this.onChangeTriggerEnter();
			this.onChangeShowTitle();
		},

		onRender: function() {
			var view = this;

			if(this.options.visible_fields === "trigger") {
				setTimeout(function() {view.renderMap()}, 300);
				this.initializeQR();
			}

		},


		/* Crud */

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


		/* Radio Logic */

		onChangeType: function() {
			var view = this;

			// Hide radio buttons and add bootstrap classes
			//
			var selected_radio = this.$el.find("input[name=trigger-type]:checked");

			this.$el.find("input[name=trigger-type]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			// Hide all and open selected tab
			//
			this.$el.find('.type-trigger-tab').hide();

			var display_tab = "#" + selected_radio.val() + "-fields";
			$(display_tab).show();

			// Hidden maps have rendering issues.
			setTimeout(function() {view.renderMap()}, 300);
		},

		onChangeTriggerEnter: function() {
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
					var icon_chooser = new MediaChooserView({collection: media});
					vent.trigger("application:popup:show", icon_chooser, "Choose Icon");

					icon_chooser.on("media:choose", function(media) {
						view.icon = media;
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
			this.qr_code = new QRCode(this.$el.find('.qr_image').get(0), this.model.get("qr_code"));
		},

		onChangeCode: function() {
			this.qr_code.makeCode(this.ui.code.val());
		},

		/* Map */

		renderMap: function() {
			var view = this;

			// Render Map
			var element = this.$el.find('.map-canvas').get(0);

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
			//setTimeout(function() {console.log("centering"); center_on(circle_marker);}, 300);
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
