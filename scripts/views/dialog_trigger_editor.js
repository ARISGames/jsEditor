define([
	'underscore',
	'jquery',
	'backbone',
	'text!../../templates/dialog_trigger_editor.tpl',
	'vent'
], function(_, $, Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),


		initialize: function(options) {
			this.scene    = options.scene;
			this.dialog   = options.dialog;
			this.instance = options.instance;
			this.show_dialog_fields = options.show_dialog_fields;
		},


		// FIXME use model binding or delegates for combined fields?
		// or regions to render the sub views
		// or form generators
		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				show_dialog_fields: this.show_dialog_fields,

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
			"type": "input[name=type]:checked",
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
			"change input[name='type']": "onChangeType"
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

							// Save Trigger
							trigger.set("instance_id", instance.id);
							trigger.set("title",       view.ui.title.val());
							trigger.set("latitude",    view.ui.latitude.val());
							trigger.set("longitude",   view.ui.longitude.val());
							trigger.set("distance",    view.ui.distance.val());
							trigger.set("wiggle",      view.ui.wiggle.val());
							trigger.set("show_title",  view.ui.show_title.val());
							trigger.set("code",        view.ui.code.val());

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
			var display_tab = "#" + this.$el.find('input:radio[name=type]:checked').val() + "-fields";
			$(display_tab).show();
		},

		onShow: function() {
			this.onChangeType();
		}
	});
});
