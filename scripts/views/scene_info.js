
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
			title: '#scene-title'
		},
			

		events: {
			"click .save-scene": "onClickSave"
		},

		onClickSave: function() {
			this.model.set('title', this.ui.title.val());
			// persist
		}
	});
});
