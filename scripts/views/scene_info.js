
define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/scene_info.tpl',
], function($, _, Backbone, Marionette, Template) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		ui: {
			name: '#scene-name'
		},


		events: {
			"click .save-scene": "onClickSave",
			"click .delete-scene": "onClickDelete"
		},

		onClickSave: function() {
			this.model.set('name', this.ui.name.val());

			this.model.save({}, {
				success: function() {
					console.log("save!");
				}
			});
		},

		onClickDelete: function() {
			this.model.destroy({
				success: function() {
					console.log("delete!");
				}
			});
		}
	});
});
