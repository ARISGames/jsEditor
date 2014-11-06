define(function(require)
{
	var TriggerEditorBaseView = require('views/trigger_editor_base');

	var _        = require('underscore');
	var Template = require('text!templates/dialog_trigger_editor.tpl');

	var vent     = require('vent');

	var DialogEditorView        = require('views/dialog_editor');


	return TriggerEditorBaseView.extend({
		template: _.template(Template),

		initialize: function(options) {
			this.scene    = options.scene;
			this.icon     = options.icon;
			this.dialog   = options.dialog;
			this.instance = options.instance;

			this.visible_fields = options.visible_fields;

			var view = this;

			vent.on("game_object:update", function(game_object) {
				if(game_object.is(view.dialog))
				{
					view.dialog = game_object;
					view.set_name(view.dialog);
				}
			});

			vent.on("game_object:delete", function(game_object) {
				if(game_object.is(view.dialog))
				{
					view.close();
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

				icon_thumbnail_url:  this.icon.thumbnail(),

				is_checked: function(value) {
					return value === "1" ? "checked" : "";
				},

				radio_selected: function(boolean_statement) {
					return boolean_statement ? "checked" : "";
				},

				// Dialog Attributes
				dialog_id: this.dialog.get('dialog_id'),
				name: this.dialog.get('name')
			}
		},


		events: {
			"click .save": "onClickSave",
			"click .delete": "onClickDelete",
			"click .cancel": "onClickCancel",
			"click .change-icon":  "onClickChangeIcon",
			"change @ui.infinite": "onChangeInfinity",
			"change @ui.show_title": "onChangeShowTitle",
			"change input[name='trigger-type']": "onChangeType",
			"change input[name='trigger-trigger_on_enter']": "onChangeTriggerEnter",
			"click .edit-dialog": "onClickEditDialog",
			"click .edit-requirements": "onClickEditRequirements",
			"change #trigger-code": "onChangeCode",
			"keyup #trigger-code": "onChangeCode"
		},


		onClickEditDialog: function() {
			var view = this;

			// TODO catch media change? to update trigger if its using parent.
			var dialog_editor = new DialogEditorView({model: view.dialog});
			vent.trigger("application:popup:show", dialog_editor, "Edit Conversation");
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

			// TODO unwravel unto promises with fail delete (or a single api call that has a transaction)
			dialog.save({}, {
				create: function() {
					vent.trigger("dialog:add", dialog);
				},
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
								trigger.set("qr_code",        view.ui.code.val());

								trigger.set("wiggle",            view.ui.wiggle.is    (":checked") ? "1" : "0");
								trigger.set("show_title",        view.ui.show_title.is(":checked") ? "1" : "0");
								trigger.set("hidden",            view.ui.hidden.is    (":checked") ? "1" : "0");
								trigger.set("infinite_distance", view.ui.infinite.is  (":checked") ? "1" : "0");

								trigger.set("type",             view.$el.find("input[name=trigger-type]:checked").val());
								trigger.set("trigger_on_enter", view.$el.find("input[name=trigger-trigger_on_enter]:checked").val());

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

							});
						}
					});

				}
			});
		},
	});
});
