define([
	'underscore',
	'jquery',
	'backbone',
	'text!../../templates/dialog_editor.tpl',
	'vent'
], function(_, $, Backbone, Template, vent) {

	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		templateHelpers: function() {
			return {
				is_new: this.model.isNew()
			}
		},


		ui: {
			"name": "#dialog-name",
			"description": "#dialog-description",
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},


		events: {
			"click .save": "onClickSave",
		},


		onClickSave: function() {
			var view   = this;
			var dialog = this.model;

			// Save Object
			dialog.set("name",        view.ui.name.val());
			dialog.set("description", view.ui.description.val());

			dialog.save({}, {
				success: function() {
					vent.trigger("dialog:update", dialog);
					vent.trigger("application:dialog:hide");
				}
			});
		}
	});
});
