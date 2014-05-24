define([
	'backbone',
	'text!../../templates/dialog_creator.tpl',
	'vent'
], function(Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				name: this.options.dialog.get('name'),
				description: this.options.dialog_instance.get('description')
			}
		},

		ui: {
			"name": "#dialog-name",
			"description": "#instance-description"
		},

		events: {
			"click .save": "onClickSave"
		},

		/* Save dialog for game and instance for scene */
		onClickSave: function() {
			var view = this;
			var dialog = this.options.dialog;
			var instance  = this.options.dialog_instance;

			// save dialog
			dialog.set("name", view.ui.name.val());

			dialog.save({},
			{
				success: function()
				{
					instance.set("description",    view.ui.description.val());
					instance.set("scene_id",       view.options.scene.id);
					instance.set("dialog_id",   dialog.id);
					instance.set("dialog_name", dialog.get("name"));
					instance.set("dialog",      dialog);

					instance.save({},
					{
						success: function()
						{
							vent.trigger("scene:add_instance", instance);
						}
					});
				}
			});
		}
	});
});
