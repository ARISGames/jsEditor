
define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/scene_info.tpl',
	'i18n!../locale/nls/form.js',
], function($, _, Backbone, Marionette, Template, translation) {
	return Backbone.Marionette.ItemView.extend({
		template: _.template(Template),

		// TODO move into a base view
		templateHelpers: function() {
			return {
				model: this.model,
				    t: translation
			};
		},

		ui: {
			name: '#scene-name'
		},

		events: {
			"click .save-scene":   "onClickSave",
			"click .delete-scene": "onClickDelete"
		},

		onClickSave: function() {
			this.model.set('name', this.ui.name.val());
			this.model.save();
		},

		onClickDelete: function() {
			this.model.destroy();
		}
	});
});
