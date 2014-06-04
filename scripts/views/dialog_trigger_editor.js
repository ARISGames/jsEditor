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
			"change input[name='trigger-type']": "onChangeType",
			"click .edit-dialog": "onClickEditDialog",
			"click .edit-requirements": "onClickEditRequirements"
		},

		onClickEditDialog: function() {
			var dialog_editor = new DialogEditorView({model: this.dialog});
			vent.trigger("application:dialog:show", dialog_editor);
		},

		onClickSave: function() {
			var view = this;
			var instance = this.instance;
			var dialog   = this.dialog;
			var trigger  = this.model;

			// Save Object
			dialog.set("name",        view.ui.name.val());
			dialog.set("description", view.ui.description.val());

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
							trigger.set("title",       view.ui.title.val());
							trigger.set("latitude",    view.ui.latitude.val());
							trigger.set("longitude",   view.ui.longitude.val());
							trigger.set("distance",    view.ui.distance.val());
							trigger.set("wiggle",      view.ui.wiggle.val());
							trigger.set("show_title",  view.ui.show_title.val());
							trigger.set("code",        view.ui.code.val());
							trigger.set("type",        view.$el.find("input[name=trigger-type]:checked").val());

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
		}
	});
});
