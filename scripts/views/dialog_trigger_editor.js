define([
	'underscore',
	'backbone',
	'text!../../templates/dialog_trigger_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),


		initialize: function(options) {
			this.scene    = options.scene;
			this.dialog   = options.dialog;
			this.instance = options.instance;
		},


		// FIXME use model binding or delegates for combined fields?
		// or regions to render the sub views
		// or form generators
		templateHelpers: function() {
			return {
				// Dialog Attributes
				name: this.dialog.get('name'),
				description: this.dialog.get('description'),
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
			"click .save": "onClickSave"
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
								success: function()
								{
									vent.trigger("scene:add_trigger", trigger);
								}
							});
						}
					});

				}
			});


		}
	});
});
