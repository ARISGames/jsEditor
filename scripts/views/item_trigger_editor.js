define([
	'underscore',
	'jquery',
	'backbone',
	'qrcode',
	'text!templates/item_trigger_editor.tpl',
	'views/item_editor',
	'views/requirements_editor',
	'views/media_chooser',
	'models/requirements_package',
	'models/media',
	'models/game',
	'collections/media',
	'vent'
], function(_, $, Backbone, QRCode, Template, ItemEditorView, RequirementsEditorView, MediaChooserView, RequirementsPackage, Media, Game, MediaCollection, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),


		initialize: function(options) {
			this.scene    = options.scene;
			this.icon     = options.icon;
			this.item     = options.item;
			this.instance = options.instance;
			this.visible_fields  = options.visible_fields;

			var view = this;

			vent.on("game_object:update", function(game_object) {
				if(game_object.id === view.item.id && game_object.idAttribute === view.item.idAttribute) {
					view.item = game_object;
					view.render();
					view.onChangeType();
					view.onChangeTriggerEnter();
				}
			});
		},


		// FIXME use model binding or delegates for combined fields?
		// or regions to render the sub views
		// or form generators
		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				in_modal: this.options.in_modal,
				visible_fields: this.visible_fields,

				icon_thumbnail_url:  this.icon.get("thumb_url"),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},

				// Item Attributes
				item_id: this.item.get('item_id'),
				name: this.item.get('name')
			}
		},


		ui: {
			"name": "#item-name",
			"description": "#item-description",
			"title": "#trigger-title",
			"latitude": "#trigger-latitude",
			"longitude": "#trigger-longitude",
			"distance": "#trigger-distance",
			"wiggle": "#trigger-wiggle",
			"show_title": "#trigger-show_title",
			"hidden": "#trigger-hidden",
			"code": "#trigger-code"
		},


		events: {
			"click .save": "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel",
			"click .change-icon":  "onClickChangeIcon",
			"change input[name='trigger-type']": "onChangeType",
			"change input[name='trigger-trigger_on_enter']": "onChangeTriggerEnter",
			"click .edit-item": "onClickEditItem",
			"click .edit-requirements": "onClickEditRequirements",
			"change #trigger-code": "onChangeCode",
			"keyup #trigger-code": "onChangeCode"
		},

		onChangeCode: function() {
			this.qr_code.makeCode(this.ui.code.val());
		},

		onClickEditItem: function() {
			var view = this;
			var icon  = new Media({media_id: this.item.get("icon_media_id")});
			var media = new Media({media_id: this.item.get("media_id")});

			$.when(icon.fetch(), media.fetch()).done(function () {
				var item_editor = new ItemEditorView({model: view.item, icon: icon, media: media});
				vent.trigger("application:popup:show", item_editor, "Edit Item");
			});
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

		onClickSave: function() {
			var view = this;
			var instance = this.instance;
			var item     = this.item;
			var trigger  = this.model;

			// FIXME temporary fix to grab fields only when visible
			if(view.options.visible_fields === "create_item_with_trigger" ) {
				item.set("name",        view.ui.name.val());
			}

			// TODO unwravel unto promises with fail delete (or a single api call that has a transaction)
			item.save({}, {
				create: function() {
					vent.trigger("item:add", item);
				},
				success: function() {
					// Save Instance

					instance.set("object_id",   item.id);
					instance.set("object_type", instance.type_for(item));

					instance.save({}, {
						success: function() {
							// If new, create empty requirement
							/* {
								  "game_id":1,
								  "name":"requirementPackageName",
								  "and_packages": [
								  ]
								}*/

							// Save Trigger
							trigger.set("instance_id", instance.id);

							// FIXME temporary fix to grab fields only when visible
							if(view.options.visible_fields === "trigger") {
								trigger.set("title",       view.ui.title.val());
								trigger.set("code",        view.ui.code.val());

								trigger.set("wiggle",      view.ui.wiggle.is    (":checked") ? "1" : "0");
								trigger.set("show_title",  view.ui.show_title.is(":checked") ? "1" : "0");
								trigger.set("hidden",      view.ui.hidden.is    (":checked") ? "1" : "0");

								trigger.set("type",             view.$el.find("input[name=trigger-type]:checked").val());
								trigger.set("trigger_on_enter", view.$el.find("input[name=trigger-trigger_on_enter]:checked").val());

								trigger.set("icon_media_id", view.icon.get("media_id"));
							}
							// Initial Title
							else {
								trigger.set("title", item.get("name") +" #"+instance.id);
							}

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
							});
						}
					});

				}
			});
		},

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
						view.render();
						view.onChangeType();
						view.onChangeTriggerEnter();
						vent.trigger("application:popup:hide");
					});
				}
			});
		},

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

			setTimeout(function() {view.renderMap()}, 300);
		},

		onShow: function() {
			this.onChangeType();
			this.onChangeTriggerEnter();

			this.$el.find('input[autofocus]').focus();
		},

		onClickEditRequirements: function() {
			var requirements_package = new RequirementsPackage({});
			vent.trigger("application:popup:show", new RequirementsEditorView({model: requirements_package}));
		},

		onRender: function() {
			var view = this;

			if(this.options.visible_fields === "trigger") {
				setTimeout(function() {view.renderMap()}, 300);
				this.qr_code = new QRCode(this.$el.find('.qr_image').get(0), this.model.get("code"));
			}

		},

		renderMap: function() {
			var view = this;

			// Render Map
			var element = this.$el.find('.map-canvas').get(0);

			var default_location = new google.maps.LatLng(43.073, -89.4012);
			var map_options = {
				zoom: 8,
				center: default_location
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



		}
	});
});
