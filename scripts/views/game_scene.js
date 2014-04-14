define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'text!../../templates/game_scene.tpl',
], function($, _, Backbone, Marionette, Template, GameCollection, GameItemView) {
	return Backbone.Marionette.CompositeView.extend({
		template: _.template(Template),

		className: "scene",

		onRender: function() {
			$(this.$el).draggable({ containment: "parent" });
		}
	});
});
