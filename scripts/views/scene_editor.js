define([
	'underscore',
	'backbone',
	'text!../../templates/scene_editor.tpl',
	'vent'
], function(_, Backbone, Template, vent) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// TODO move into a base view
		templateHelpers: function() {
			return {
				is_new: this.model.isNew(),
				in_modal: this.options.in_modal
			};
		},

		ui: {
			name: '#scene-name'
		},

		onShow: function() {
			this.$el.find('input[autofocus]').focus();
		},

		events: {
			"click .save-scene":   "onClickSave",
			"click .cancel":       "onClickCancel",
			"click .delete-scene": "onClickDelete"
		},

		// FIXME why do we need this vs other views?
		modelEvents: {
			"change": "render"
		},

		onClickSave: function() {
			var view = this;
			this.model.set('name', this.ui.name.val());
			this.model.save({}, {
					success: function() {
						vent.trigger("scenes:add_scene", view.model);
						vent.trigger("application:dialog:hide");
					}
			});
		},


		onClickCancel: function() {
			this.close();
			vent.trigger("application:dialog:hide");
		},

		onClickDelete: function() {
			var view = this;

			this.model.destroy({
				success: function() {
					view.close();
				}
			});
		}
	});
});
