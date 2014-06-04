define([
	'underscore',
	'jquery',
	'backbone',
	'text!../../templates/dialog_trigger_editor.tpl',
	'views/dialog_editor',
	'views/requirements_editor',
	'models/requirements_package',
	'vent'
], function(_, $, Backbone, Template, DialogEditorView, RequirementsEditorView, RequirementsPackage, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),


		initialize: function(options) {
			this.scene    = options.scene;
			this.dialog   = options.dialog;
			this.instance = options.instance;
			this.visible_fields  = options.visible_fields;
		},


		// FIXME use model binding or delegates for combined fields?
		// or regions to render the sub views
		// or form generators
		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				visible_fields: this.visible_fields,
				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				// Dialog Attributes
				dialog_id: this.dialog.get('dialog_id'),
				name: this.dialog.get('name'),
				description: this.dialog.get('description'),
				icon_media_id: this.dialog.get('icon_media_id'),
				media_id: this.dialog.get('media_id'),
				opening_script_id: this.dialog.get('opening_script_id'),
				closing_script_id: this.dialog.get('closing_script_id')
			}
		},


		ui: {
			"name": "#dialog-name",
			"description": "#dialog-description",
			"title": "#trigger-title",
			"latitude": "#trigger-latitude",
			"longitude": "#trigger-longitude",
			"distance": "#trigger-distance",
			"wiggle": "#trigger-wiggle",
			"show_title": "#trigger-show_title",
			"code": "#trigger-code"
		},


		events: {
			"click .save": "onClickSave",
			"click .cancel": "onClickCancel",
			"change input[name='trigger-type']": "onChangeType",
			"click .edit-dialog": "onClickEditDialog",
			"click .edit-requirements": "onClickEditRequirements"
		},

		onClickEditDialog: function() {
			var dialog_editor = new DialogEditorView({model: this.dialog});
			vent.trigger("application:dialog:show", dialog_editor);
		},

		onClickCancel: function() {
			this.close();
			vent.trigger("application:dialog:hide");
		},

		onClickSave: function() {
			var view = this;
			var instance = this.instance;
			var dialog   = this.dialog;
			var trigger  = this.model;

			// FIXME temporary fix to grab fields only when visible
			if(view.options.visible_fields === "create_dialog_with_trigger" ) {
				dialog.set("name",        view.ui.name.val());
			}

			dialog.save({}, {
				success: function() {

					// Save Instance

					instance.set("object_id",   dialog.id);
					instance.set("object_type", instance.type_for(dialog));

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
								trigger.set("wiggle",      view.ui.wiggle.is(":checked") ? "1" : "0");
								trigger.set("show_title",  view.ui.show_title.is(":checked") ? "1" : "0");
								trigger.set("code",        view.ui.code.val());
								trigger.set("type",        view.$el.find("input[name=trigger-type]:checked").val());
							}

							trigger.save({},
							{
								create: function()
								{
									// FIXME better way to handle this?
									vent.trigger("scene:add_trigger", trigger);
									vent.trigger("application:dialog:hide");
								}
							});
						}
					});

				}
			});
		},

		onChangeType: function() {
			this.$el.find('.trigger-tab').hide();

			var selected_radio = this.$el.find("input[name=trigger-type]:checked");

			this.$el.find("input[name=trigger-type]").parent().removeClass("active");
			selected_radio.parent().addClass("active");


			var display_tab = "#" + selected_radio.val() + "-fields";
			$(display_tab).show();
		},

		onShow: function() {
			this.onChangeType();
		},

		onClickEditRequirements: function() {
			var requirements_package = new RequirementsPackage({});
			vent.trigger("application:dialog:show", new RequirementsEditorView({model: requirements_package}));
		},

		onRender: function() {
			if(this.options.visible_fields === "trigger") {
				this.renderMap();
			}
		},

		renderMap: function() {
			var view = this;

			// Render Map
			var element = this.$el.find('.map-canvas').get(0);

			var default_location = new google.maps.LatLng(-34.397, 150.644);
			var map_options = {
				zoom: 8,
				center: default_location
			};
			var map = new google.maps.Map(element, map_options);
			var boundary = new google.maps.LatLngBounds();

			boundary.extend(default_location);

			// Add Trigger Location to map
			var location_position = new google.maps.LatLng(this.model.get("latitude"), this.model.get("longitude"));


			var marker = new google.maps.Circle({
				center: location_position,
				draggable: true,
				editable: true,
				radius: parseFloat(this.model.get("distance")),
				map: map
			});

			google.maps.event.addListener(marker, 'radius_changed', function(event) {
				console.log("rad", marker.getRadius());
				view.model.set("distance", marker.getRadius());
			});

			google.maps.event.addListener(marker, 'center_changed', function(event) {
				var center = marker.getCenter();

				view.model.set("latitude",  center.lat());
				view.model.set("longitude", center.lng());
			});

			// Add circle radius to map boundary
			boundary.union(marker.getBounds());

			// Fit map to all locations
			map.setCenter(boundary.getCenter());
			map.fitBounds(boundary);
		}
	});
});
